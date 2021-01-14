import { Backdrop, Button, CircularProgress, Container, Grid, Typography } from "@material-ui/core";

export function CustomBackdrop(props) {
  return (
    <Container>
      <Backdrop open={props.open} style={{ color: "#fff", zIndex: 100 }}>
        <Button>Hello there</Button>

      </Backdrop>
    </Container>

  );
}