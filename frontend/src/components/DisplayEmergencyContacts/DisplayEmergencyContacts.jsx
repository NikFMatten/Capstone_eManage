import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditEmergencyContact from "../EditEmergencyContact/EditEmergencyContact";

const DisplayEmergencyContacts = (props) => {
  const { emergContacts, fetchEmergencyContacts } = props;
  const [token] = useAuth();
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState();
  const [emergencyContact, setEmergencyContact] = useState([]);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const handleEdit = (emergencyContact) => {
    setEmergencyContact(emergencyContact);
    showModal();
  };

  const deleteEmergencyContact = async (eContactId) => {
    try {
      await axios.delete(
        `http://52.87.162.151:8000/emergencyContact/${eContactId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchEmergencyContacts();
      setToggle(!toggle);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {emergContacts.length > 0 ? (
        <TableContainer component={Paper}>
          <Typography
            variant="h5"
            color="white"
            sx={{
              textAlign: "center",
              py: "10px",
              backgroundColor: "#ffc163",
              boxShadow: 3,
            }}
          >
            Employee Emergency Contacts
          </Typography>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Employee
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Contact Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Contact Phone Number
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emergContacts.map((emergencyContact) => {
                return (
                  <TableRow
                    key={emergencyContact.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Typography variant="subtitle1">
                        {" "}
                        {emergencyContact.user.first_name +
                          " " +
                          emergencyContact.user.last_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {emergencyContact.first_name}{" "}
                        {emergencyContact.last_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {emergencyContact.phone_number}
                      </Typography>
                    </TableCell>
                    <TableCell padding="none">
                      <IconButton
                        variant="contained"
                        onClick={() => handleEdit(emergencyContact)}
                        type="button"
                        size="small"
                        title="Edit Emergency Contact"
                      >
                        <EditIcon style={{ color: "orange" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell padding="none">
                      <IconButton
                        variant="contained"
                        onClick={() =>
                          deleteEmergencyContact(emergencyContact.id)
                        }
                        type="submit"
                        size="small"
                        title="Delete Emergency Contact"
                      >
                        <DeleteIcon style={{ color: "orange" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <EditEmergencyContact
            show={show}
            handleClose={hideModal}
            emergencyContact={emergencyContact}
          >
            <p>Edit Emergency Contact</p>
          </EditEmergencyContact>
        </TableContainer>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DisplayEmergencyContacts;
