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
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");

  const { timeLeft, canResendCode, startTimer } = useVerificationTimer(
    180,
    () => {
      setVerificationCode(null);
      setErrorMessage(t("contact.form.messages.invalid_or_expired_code"));
      setIsCodeDialogOpen(false);
    }
  );

 const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, t("contact.validation.name_min")) // Min characters set to 2
    .max(100, t("contact.validation.name_max")) // Max characters increased to 100
    .required(t("contact.validation.name_required")),

  email: Yup.string()
    .email(t("contact.validation.email_valid")) // Rely on Yup's email validator
    .required(t("contact.validation.email_required")),
    

  message: Yup.string()
    .min(3, t("contact.validation.message_min")) // Minimum 3 characters
    .max(1000, t("contact.validation.message_max")) // Maximum 1000 characters
    .required(t("contact.validation.message_required")),
});


  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const sendVerificationCode = (email) => {
    setIsCodeLoading(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
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

  const verifyCodeAndSendMessage = (values, resetForm) => {
    if (!verificationCode || enteredCode !== verificationCode) {
      setErrorMessage(t("contact.form.messages.invalid_verification_code"));
      return;
    }

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
        setVerificationCode(null);
        setEnteredCode("");
      })
      .catch(() => {
        setErrorMessage(t("contact.form.messages.error"));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{t("contact.form.verification.title")}</Typography>
        <Formik
          // validateOnBlur={false} // Blur (alan dışına tıklama) sırasında doğrulamayı devre dışı bırakır
          // validateOnChange={false} // Değişiklik sırasında doğrulamayı devre dışı bırakır Kullanıcı formu doldururken: Hatalar gösterilmeyecek.
          initialValues={{ name: "", email: "", message: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (!captchaVerified) {
              setErrorMessage(t("contact.form.messages.captcha_error"));
              return;
            }
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

              <Dialog
                open={isCodeDialogOpen}
                onClose={() => setIsCodeDialogOpen(false)}
              >
                <DialogTitle>{t("contact.form.verification.title")}</DialogTitle>
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
                  <Typography sx={{ marginTop: 2 }}>
                    {t("contact.form.verification.code_timer", { time: timeLeft })}
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
            </Form>
          )}
        </Formik>
        {successMessage && (
          <Alert severity="success" sx={{ marginTop: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactForm;
