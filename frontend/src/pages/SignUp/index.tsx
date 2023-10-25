import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../@types";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../hook/useAuth";

import "../../assets/css/sign.css";

function SignUpPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [userForm, setUserForm] = useState<IUser>({
    fullname: "",
    username: "",
    password: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const [messegeError, setMessegeErro] = useState("");
  const [messegeSuccess, setMessegeSuccess] = useState("");

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      await register(userForm);
    } catch (e) {
      const error = e as Error;
      setMessegeErro(String(error.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box id="sign-up-page" className="sign-page">
      <form onSubmit={handleSignUp}>
        <Card>
          <CardContent className="sign-content">
            <Typography variant="h5">Crie uma conta</Typography>
            <Typography variant="subtitle1">
              Ainda não tem uma conta TOPIC?
            </Typography>
            <TextField
              label="Nome Completo"
              required
              fullWidth
              value={userForm.fullname}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  fullname: (event.target as HTMLInputElement).value,
                })
              }
            />

            <TextField
              label="Usuário"
              required
              fullWidth
              value={userForm.username}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  username: (event.target as HTMLInputElement).value,
                })
              }
            />

            <TextField
              label="Senha"
              required
              fullWidth
              type="password"
              value={userForm.password}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  password: (event.target as HTMLInputElement).value,
                })
              }
            />

            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={loading}
            >
              Criar
            </LoadingButton>

            <Box className="sign-separator">
              <Box className="traco"></Box>
              <Typography component="h5">OU</Typography>
              <Box className="traco"></Box>
            </Box>

            <Typography variant="h5"> Faça o Login</Typography>
            <Typography variant="subtitle1">Já tem uma conta TOPIC?</Typography>
            <Button
              type="submit"
              variant="outlined"
              size="large"
              onClick={() => navigate("/signin")}
            >
              Acessar Conta
            </Button>
          </CardContent>
        </Card>
      </form>
      <Snackbar
        open={Boolean(messegeError)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setMessegeErro("")}
      >
        <Alert severity="error" variant="filled">
          {messegeError}
        </Alert>
      </Snackbar>
      <Snackbar
        open={Boolean(messegeSuccess)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setMessegeSuccess("")}
      >
        <Alert severity="success" variant="filled">
          {messegeSuccess}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SignUpPage;
