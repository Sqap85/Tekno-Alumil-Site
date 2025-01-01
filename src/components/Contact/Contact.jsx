import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  useTheme,
  TextField,
  Alert,
  Skeleton,
} from "@mui/material";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const theme = useTheme();
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const iframeRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        setIsMapLoading(false);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const phoneNumbers = ["05338388585", "05488488585"];
  const email = "teknoalumil85@gmail.com";
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.971742487271!2d33.867924699999996!3d35.1323787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dfcb4508dc81d5%3A0xd48bdf1c89f2c4ca!2sTekno%20Al%C3%BCmil!5e0!3m2!1str!2str!4v1735452569471!5m2!1str!2st";

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t("contact.validation.name_min"))
      .max(50, t("contact.validation.name_max"))
      .matches(/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/, t("contact.validation.name_format"))
      .required(t("contact.validation.name_required")),

    email: Yup.string()
      .email(t("contact.validation.email_valid"))
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        t("contact.validation.email_valid")
      )
      .test(
        "is-valid-local-part",
        t("contact.validation.email_local_part"),
        (value) => {
          if (!value) return false;
          const localPart = value.split("@")[0];
          return !/^\d+$/.test(localPart) && /[a-zA-Z]/.test(localPart);
        }
      )
      .test(
        "is-valid-domain",
        t("contact.validation.email_domain"),
        (value) => {
          if (!value) return false;
          const domainParts = value.split("@")[1]?.split(".");
          if (!domainParts || domainParts.length < 2) return false;

          const domain = domainParts[0];
          const tld = domainParts[domainParts.length - 1];

          const validTLDs = [
            "com",
            "net",
            "org",
            "edu",
            "gov",
            "mil",
            "info",
            "io",
            "biz",
            "tr",
          ];
          return !/^\d+$/.test(domain) && validTLDs.includes(tld);
        }
      )
      .required(t("contact.validation.email_required")),

    message: Yup.string()
      .min(5, t("contact.validation.message_min"))
      .max(500, t("contact.validation.message_max"))
      .required(t("contact.validation.message_required")),
  });

  const renderContactInfo = () => (
    <Card>
      <CardContent>
        <Typography variant="h6">{t("contact.info.title")}</Typography>
        <Box sx={{ marginTop: 2 }}>
          {phoneNumbers.map((phone, index) => (
            <Typography
              key={index}
              variant="body2"
              component="a"
              href={`tel:${phone}`}
              sx={{
                textDecoration: "none",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <MdPhone /> {t("contact.info.phone_label")}: {phone}
            </Typography>
          ))}
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            <MdEmail /> {t("contact.info.email_label")}:
          </Typography>
          <Typography
            variant="body2"
            component="a"
            href={`mailto:${email}`}
            sx={{
              textDecoration: "none",
              color: "primary.main",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {email}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            <MdLocationOn /> {t("contact.info.address_label")}:
          </Typography>
          <Typography variant="body2">{t("contact.info.address")}</Typography>
        </Box>
      </CardContent>
    </Card>
  );

  const renderGoogleMaps = () => (
    <Card>
      <CardContent>
        <Typography variant="h6">
          <MdLocationOn /> {t("contact.map.title")}
        </Typography>
        {isMapLoading && !mapError && (
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", height: 300, marginTop: 2 }}
          />
        )}
        {mapError ? (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {t("contact.map.error_message")}
          </Alert>
        ) : (
          <Box
            component="iframe"
            src={googleMapsEmbedUrl}
            ref={iframeRef}
            onError={() => {
              setIsMapLoading(false);
              setMapError(true);
            }}
            sx={{
              display: mapError || isMapLoading ? "none" : "block",
              width: "100%",
              height: 300,
              border: "none",
              marginTop: 2,
              zIndex: 0,
              pointerEvents: "auto",
            }}
            allow="geolocation"
            allowFullScreen
            loading="lazy"
          />
        )}
      </CardContent>
    </Card>
  );

  const renderContactForm = () => {
    const theme = useTheme();
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCodeLoading, setIsCodeLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [verificationCode, setVerificationCode] = useState(null);
    const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
    const [enteredCode, setEnteredCode] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [canResendCode, setCanResendCode] = useState(false);

    const handleCaptchaChange = (value) => {
      setCaptchaVerified(!!value);
    };

    const startCountdown = (duration) => {
      let time = duration;
      setTimeLeft(time);
      setCanResendCode(false);

      const id = setInterval(() => {
        time -= 1;
        setTimeLeft(time);

        if (time <= 0) {
          clearInterval(id);
          setVerificationCode(null);
          setErrorMessage(t("contact.form.messages.invalid_or_expired_code"));
          setCanResendCode(true);
          setIsCodeDialogOpen(false);
        }
      }, 1000);

      setIntervalId(id);
    };

    const sendVerificationCode = (email) => {
      setIsCodeLoading(true);
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCode(code);

      if (intervalId) clearInterval(intervalId);
      startCountdown(180);

      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_VERIFICATION_ID,
          { code, email },
          import.meta.env.VITE_EMAILJS_USER_ID
        )
        .then(() => {
          setSuccessMessage(t("contact.form.messages.verification_email_sent"));
          setErrorMessage("");
          setIsCodeDialogOpen(true);
        })
        .catch(() => {
          setErrorMessage(t("contact.form.messages.verification_email_error"));
        })
        .finally(() => {
          setIsCodeLoading(false);
        });
    };

    const verifyCodeAndSendMessage = (values, resetForm) => {
      if (!verificationCode) {
        setErrorMessage(t("contact.form.messages.invalid_or_expired_code"));
        return;
      }
      if (enteredCode === verificationCode) {
        setIsLoading(true);

        emailjs
          .send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
              name: values.name,
              email: values.email,
              message: values.message,
              reply_to: values.email,
            },
            import.meta.env.VITE_EMAILJS_USER_ID
          )
          .then(() => {
            setSuccessMessage(t("contact.form.messages.success"));
            setErrorMessage("");
            resetForm();
            setCaptchaVerified(false);
            setIsCodeDialogOpen(false);
            setVerificationCode(null);
            setEnteredCode("");
            if (intervalId) clearInterval(intervalId);
          })
          .catch(() => {
            setErrorMessage(t("contact.form.messages.error"));
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setErrorMessage(t("contact.form.messages.invalid_verification_code"));
      }
    };

    return (
      <Card>
        <CardContent>
          <Typography variant="h6">
            {t("contact.form.verification.title")}
          </Typography>
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
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
                      onClick={() =>
                        verifyCodeAndSendMessage(values, resetForm)
                      }
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

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h4" textAlign="center">
        {t("contact.page.title", "Contact")}
      </Typography>
      {renderContactInfo()}
      {renderGoogleMaps()}
      {renderContactForm()}
    </Box>
  );
};

export default Contact;
