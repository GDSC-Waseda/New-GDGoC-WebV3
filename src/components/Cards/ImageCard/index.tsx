import Image from "next/image";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { ImageCardProps } from "~/types/index";

export const ImageCard: React.FC<{
  children?: React.ReactNode;
  props: ImageCardProps;
}> = ({ children, props }) => {
  const imageProps = (
    <Image
      className="imageCard__image"
      src={props.image}
      width={350}
      height={350}
      alt="image-card"
    />
  );

  const textProps = (
    <Box padding={2} sx={{ maxWidth: 430, border: 0 }}>
      <Container>
        <Typography
          style={{ fontFamily: '"myFont", sans-serif' }}
          gutterBottom
          variant="h4"
          component="div"
          align="center"
          fontWeight="normal"
          className="imageCard__title"
        >
          {props.name}
        </Typography>
        {props.content !== undefined &&
          props.content.split("\n").map((text, key) => (
            <Typography
              gutterBottom
              color="text.secondary"
              align="center"
              style={{ fontFamily: '"myFont4", sans-serif' }}
              key={key}
            >
              {text}
            </Typography>
          ))}
        {children !== undefined && (
          <div className="imageCard__others">{children}</div>
        )}
      </Container>
    </Box>
  );

  return (
    <Box padding={3} className="image-card">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={`image - card__layout--left} `}
      >
        {textProps ? ( 
          <>
            <Grid item sm="auto">
              {imageProps}
            </Grid>
            <Grid item sm="auto">
              {textProps}
            </Grid>
          </>
        ) : 
        <Grid item sm="auto">
          {imageProps}
        </Grid>
        }
      </Grid>
    </Box>
  );
};

export default ImageCard;
