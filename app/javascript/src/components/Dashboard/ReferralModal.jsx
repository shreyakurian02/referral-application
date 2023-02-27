import React from "react";
import { referralsApi } from "apis/referrals";
import {
  Button,
  TextField,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import {
  REFERRAL_FORM_INITIAL_VALUES,
  REFERRAL_FORM_VALIDATION_SCHEMA,
} from "./constants";
import { useFormik } from "formik";

const ReferralModal = ({
  showReferModal,
  setShowReferModal,
  fetchReferrals,
}) => {
  const handleReferral = async () => {
    try {
      const payload = { referral: { email: formik.values.email } };
      await referralsApi.create(payload);
      fetchReferrals();
      setShowReferModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: REFERRAL_FORM_INITIAL_VALUES,
    validationSchema: REFERRAL_FORM_VALIDATION_SCHEMA,
    onSubmit: () => handleReferral(),
  });

  const onClose = () => setShowReferModal(false);
  return (
    <Dialog open={showReferModal} onClose={onClose}>
      <DialogTitle>Refer Email</DialogTitle>
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogContent>
          <DialogContentText>
            To refer an email to this website, please enter the email address
            here.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="Email Address"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ReferralModal;
