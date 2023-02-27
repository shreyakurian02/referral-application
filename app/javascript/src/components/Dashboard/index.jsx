import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import { Container, Button, Box } from "@mui/material";

import { referralsApi } from "../../apis/referrals";
import { COLUMNS } from "./constants";
import NavigationBar from "./NavigationBar";
import ReferralModal from "./ReferralModal";

const Dashboard = () => {
  const [referrals, setReferrals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showReferModal, setShowReferModal] = useState(false);

  const fetchReferrals = async () => {
    setIsLoading(true);
    try {
      const { data } = await referralsApi.fetch();
      setReferrals(data.referrals);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  return (
    <Container disableGutters maxWidth="w-xl">
      <NavigationBar />
      <Button
        sx={{
          marginLeft: "auto",
          display: "flex",
          mt: "1%",
          mr: "1%",
        }}
        variant="contained"
        onClick={() => setShowReferModal(true)}
      >
        Refer Email
      </Button>
      <Box
        height="calc(100vh - 130px)"
        sx={{
          pt: 5,
          mx: "1%",
          "& .super-app-theme--header": {
            backgroundColor: "rgb(178, 108, 189)",
            color: "white",
          },
        }}
      >
        <DataGrid
          disableColumnMenu
          rows={referrals}
          columns={COLUMNS}
          loading={isLoading}
        />
      </Box>
      <ReferralModal
        showReferModal={showReferModal}
        setShowReferModal={setShowReferModal}
        fetchReferrals={fetchReferrals}
      />
    </Container>
  );
};

export default Dashboard;
