export const updateEmail = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { newEmail } = req.body;

  if (newEmail && newEmail !== user.email) {
    user.email = newEmail;

    // Generate OTP for new email verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    user.isEmailVerified = false;

    await user.save();

    // Send OTP email
    await sendEmail({
      to: newEmail,
      subject: "Your OTP Code for Email Change",
      text: `Your OTP code is: ${otp}. It expires in 10 minutes.`,
    });

    return res.json({ message: "OTP sent to new email. Please verify." });
  }

  // other profile updates without email change...
};
