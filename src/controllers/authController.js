const User = require('../models/user');
const { createToken } = require('../services/jwtService');
const sendEmail = require('../services/email');
const crypto = require('crypto');
const bcrypt = require('bcrypt')
exports.signup = async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Email is already registered, please log in' });
    }
    const user = await User.create({ ...req.body });
    const token = createToken(user);
    res.status(201).json({
      status: 'success',
      token,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // check for valid email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'No users were found with this email' });
    }

    // create temp token
    const resetToken = user.createResetToken();
    await user.save();

    // send token to user's email with reset link
    const resetURL = `${req.protocol}://${req.get('host')}/auth/resetPassword/${resetToken}`;

    const message = `Submit password and confirmation password here ${resetURL}.\nIf you didn't submit this request, please ignore.`;

    await sendEmail({
      email: req.body.email,
      subject: 'Your password reset token',
      message,
    });

    res.status(200).json({ status: 'success', message: 'Email sent' });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;

    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken,
      passwordResetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid reset token',
      });
    }

    if (!req.body.password) {
      return res.status(404).json({
        status: 'fail',
        message: 'Please enter a password at least 6 characters long',
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'The passwords do not match',
      });
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiration = undefined;
    await user.save();

    const newToken = createToken(user);

    res.status(201).json({
      status: 'success',
      message: 'Password sucessfully updated',
      data: { user, newToken },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res) => {
	try {
		const prevUser = await User.findOne({ email: req.body.email});
		console.log(prevUser)
		if (prevUser) {
			const passMatch= await bcrypt.compare(
				req.body.password,
				prevUser.password
			);

			if (passMatch && req.body.email === prevUser.email) {
				const token = createToken(prevUser)

				res.status(200).json({
					status: 'success',
					message: 'Login successful',
					token,
				});
			} else {
				res.status(401).json({
					status: 'unauthorized',
					message: 'authentication error',
				});
			}
		} else {
			res.status(400).json({
				status: 'bad request',
				message: 'Username not found!',
			});
		}
	} catch (err) {
		console.log(err)
		res.status(500).json({
			status: 'internal server error',
			message: err,
		});
	}
};
