import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";
import { CheckCircle } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const useVerificationTimer = (duration, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResendCode, setCanResendCode] = useState(false);

  const startTimer = useCallback(() => {
    setTimeLeft(duration);
    setCanResendCode(false);
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setCanResendCode(true);
          onExpire();
        }
        return prev - 1;
      });
    }, 1000);
  }, [duration, onExpire]);

  return { timeLeft, canResendCode, startTimer };
};

const ContactForm = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [codeErrorMessage, setCodeErrorMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
    if (value) {
      setErrorMessage("");
    }
  };

  const { timeLeft, canResendCode, startTimer } = useVerificationTimer(
    90,
    () => {
      setVerificationCode(null);
      setCodeErrorMessage(t("contact.form.messages.invalid_or_expired_code"));
      setIsCodeDialogOpen(false);
    }
  );

  const sendVerificationCode = (email) => {
    if (verificationCode && timeLeft > 0) {
      setIsCodeDialogOpen(true);
      return;
    }

    setIsCodeLoading(true);
    const generateSecureCode = () => {
      const crypto = window.crypto || window.msCrypto;
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      return ((array[0] % 900000) + 100000).toString();
    };

    const code = generateSecureCode();

    setVerificationCode(code);
    startTimer();

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_VERIFICATION_ID,
        { code, email },
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(() => {
        setSuccessMessage(t("contact.form.messages.verification_email_sent"));
        setIsCodeDialogOpen(true);
      })
      .catch(() => {
        setErrorMessage(t("contact.form.messages.verification_email_error"));
      })
      .finally(() => setIsCodeLoading(false));
  };

  const [attemptCount, setAttemptCount] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0); // Track dynamic cooldown time

  const verifyCodeAndSendMessage = (values, resetForm) => {
    if (cooldownActive) {
      // Dynamically show the remaining cooldown time in seconds
      setCodeErrorMessage(
        t("contact.form.messages.cooldown_active", {
          time: Math.ceil(cooldownTime / 1000),
        }) // Convert ms to seconds
      );
      return;
    }

    if (!verificationCode || enteredCode !== verificationCode) {
      setAttemptCount((prev) => prev + 1);

      if (attemptCount >= 4) {
        // Start cooldown after the 5th failed attempt
        const newCooldownTime = 30000; // 30 seconds cooldown
        setCooldownTime(newCooldownTime);
        setCooldownActive(true);

        // Countdown every second
        const countdownInterval = setInterval(() => {
          setCooldownTime((prevTime) => {
            if (prevTime <= 1000) {
              // Stop the countdown when it reaches 0
              clearInterval(countdownInterval); // Clear the interval
              setCooldownActive(false); // Deactivate cooldown
              setAttemptCount(0); // Reset the attempts
              setCooldownTime(0); // Reset the cooldown time
              return 0;
            }
            return prevTime - 1000; // Decrease the time by 1 second (1000 ms)
          });
        }, 1000); // Update every second
      } else {
        setCodeErrorMessage(
          t("contact.form.messages.invalid_verification_code")
        );
      }
      return;
    }

    // Reset everything on successful verification
    setVerificationCode(null);
    setEnteredCode("");
    setCodeErrorMessage("");
    setAttemptCount(0);

    setIsLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { ...values, reply_to: values.email },
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(() => {
        setSuccessMessage(t("contact.form.messages.success"));
        resetForm();
        setIsCodeDialogOpen(false);
        setIsSuccessDialogOpen(true);
      })
      .catch(() => {
        setErrorMessage(t("contact.form.messages.error"));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          {t("contact.form.verification.title")}
        </Typography>

        <Formik
          initialValues={{ name: "", email: "", message: "" }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, t("contact.validation.name_min"))
              .max(100, t("contact.validation.name_max"))
              .required(t("contact.validation.name_required")),
            email: Yup.string()
              .email(t("contact.validation.email_valid"))
              .required(t("contact.validation.email_required")),
            message: Yup.string()
              .min(5, t("contact.validation.message_min"))
              .max(1000, t("contact.validation.message_max"))
              .required(t("contact.validation.message_required")),
          })}
          onSubmit={(values) => {
            if (!captchaVerified) {
              setErrorMessage(t("contact.form.messages.captcha_error"));
              return;
            }
            setErrorMessage("");
            sendVerificationCode(values.email);
          }}
        >
          {({ errors, touched, values, resetForm }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="name"
                    as={TextField}
                    fullWidth
                    label={t("contact.form.placeholders.name")}
                    variant="outlined"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="email"
                    as={TextField}
                    fullWidth
                    label={t("contact.form.placeholders.email")}
                    variant="outlined"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="message"
                    as={TextField}
                    fullWidth
                    label={t("contact.form.placeholders.message")}
                    variant="outlined"
                    multiline
                    rows={4}
                    error={touched.message && Boolean(errors.message)}
                    helperText={touched.message && errors.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ReCAPTCHA
                    theme={theme.palette.mode}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    fullWidth
                    disabled={isLoading || isCodeLoading}
                  >
                    {isLoading || isCodeLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      t("contact.form.buttons.submit")
                    )}
                  </Button>
                </Grid>
              </Grid>

              {errorMessage && (
                <Alert severity="error" sx={{ marginTop: 2 }}>
                  {errorMessage}
                </Alert>
              )}

              <Dialog
                open={isCodeDialogOpen}
                onClose={() => setIsCodeDialogOpen(false)}
              >
                <DialogTitle>
                  {t("contact.form.verification.title")}
                </DialogTitle>
                <DialogContent>
                  <Typography>
                    {t("contact.form.verification.enter_code")}
                  </Typography>
                  <TextField
                    fullWidth
                    label={t("contact.form.verification.code_label")}
                    variant="outlined"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                    sx={{ marginTop: 2 }}
                  />

                  {codeErrorMessage && (
                    <Alert severity="error" sx={{ marginTop: 2 }}>
                      {codeErrorMessage}
                    </Alert>
                  )}

                  <Typography sx={{ marginTop: 2 }}>
                    {t("contact.form.verification.code_timer", {
                      time: timeLeft,
                    })}
                  </Typography>

                  {canResendCode && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => sendVerificationCode(values.email)}
                      sx={{ marginTop: 2 }}
                    >
                      {t("contact.form.buttons.resend")}
                    </Button>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => verifyCodeAndSendMessage(values, resetForm)}
                    variant="contained"
                    color="secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      t("contact.form.buttons.verify_and_send")
                    )}
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Başarılı mesaj gönderildiğinde açılan dialog */}
              <Dialog
                open={isSuccessDialogOpen}
                onClose={() => setIsSuccessDialogOpen(false)}
              >
                <DialogTitle
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  {t("contact.form.messages.success")}
                  <CheckCircle color="success" />
                </DialogTitle>
                <DialogContent>
                  <Typography>
                    {t("contact.form.messages.success_message")}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setIsSuccessDialogOpen(false)}
                    variant="contained"
                    color="secondary"
                  >
                    {t("contact.form.buttons.close")}
                  </Button>
                </DialogActions>
              </Dialog>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
