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
import { ICredential } from "../../@types";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../hook/useAuth";

import "../../assets/css/sign.css";

function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [credential, setCredential] = useState<ICredential>({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [messegeError, setMessegeErro] = useState("");

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      await login(credential);
      navigate("/");
    } catch (e) {
      const error = e as Error;
      setMessegeErro(String(error.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box id="sign-in-page" className="sign-page">
      <form onSubmit={handleSignIn}>
        <Card>
          <CardContent className="sign-content">
            <Typography variant="h5">Faça o Login</Typography>
            <Typography variant="subtitle1">Já tem uma conta TOPIC?</Typography>

            <TextField
              label="Usuário"
              required
              fullWidth
              value={credential.username}
              onChange={(event) =>
                setCredential({
                  ...credential,
                  username: (event.target as HTMLInputElement).value,
                })
              }
            />

            <TextField
              label="Senha"
              required
              fullWidth
              type="password"
              value={credential.password}
              onChange={(event) =>
                setCredential({
                  ...credential,
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
              Acessar
            </LoadingButton>

            <Box className="sign-separator">
              <Box className="traco"></Box>
              <Typography component="h5">OU</Typography>
              <Box className="traco"></Box>
            </Box>

            <Typography variant="h5">Crie uma conta</Typography>
            <Typography variant="subtitle1">
              Ainda não tem uma conta TOPIC
            </Typography>
            <Button
              type="submit"
              variant="outlined"
              size="large"
              onClick={() => navigate("/signup")}
            >
              Criar Conta
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
    </Box>
  );
}

export default SignInPage;