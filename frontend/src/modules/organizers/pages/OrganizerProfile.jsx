import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Stack,
  Avatar,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import axiosInstance from "../../../api/axios";
import BASE_URL from "../../../config/config";

const OrganizerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("organizers/profile/");
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("bio", profile.bio || "");
    formData.append("website", profile.website || "");
    formData.append("address", profile.address || "");
    formData.append("contact_email", profile.contact_email || "");
    formData.append("contact_phone", profile.contact_phone || "");

    if (profile.image instanceof File) {
      formData.append("image", profile.image);
    }

    try {
      await axiosInstance.put("organizers/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });

      setEditMode(false);
      fetchProfile();
    } catch (err) {
      let message = "Update failed";

      if (err.response?.data) {
        message = Object.entries(err.response.data)
          .map(([field, msgs]) =>
            `${field}: ${
              Array.isArray(msgs) ? msgs.join(", ") : msgs
            }`
          )
          .join(" | ");
      }

      setSnackbar({
        open: true,
        message,
        severity: "error",
      });
    }
  };

  if (!profile) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper sx={{ p: 5 }}>
        <Stack spacing={3} alignItems="center">
          <Avatar
            src={
              profile.image
                ? `${BASE_URL}${profile.image}`
                : ""
            }
            sx={{ width: 120, height: 120 }}
          />

          {editMode && (
            <Button variant="outlined" component="label">
              Change Photo
              <input
                hidden
                type="file"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    image: e.target.files[0],
                  })
                }
              />
            </Button>
          )}

          <Stack spacing={2} width="100%">
            <TextField
              label="Organization Name"
              fullWidth
              value={profile.name || ""}
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
            />

            <TextField
              label="Login Email"
              fullWidth
              value={profile.email || ""}
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
            />

            <TextField
              label="Contact Email"
              fullWidth
              value={profile.contact_email || ""}
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  contact_email: e.target.value,
                })
              }
            />

            <TextField
              label="Contact Phone"
              fullWidth
              value={profile.contact_phone || ""}
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  contact_phone: e.target.value,
                })
              }
            />

            <TextField
              label="Website"
              fullWidth
              value={profile.website || ""}
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  website: e.target.value,
                })
              }
            />

            <TextField
              label="Address"
              fullWidth
              multiline
              rows={2}
              value={profile.address || ""}
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  address: e.target.value,
                })
              }
            />

            <TextField
              label="Bio"
              fullWidth
              multiline
              rows={3}
              value={profile.bio || ""}
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio: e.target.value,
                })
              }
            />
          </Stack>

          {editMode ? (
            <Button variant="contained" onClick={handleUpdate}>
              Save Changes
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          )}
        </Stack>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({ ...snackbar, open: false })
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OrganizerProfile;