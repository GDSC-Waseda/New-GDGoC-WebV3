import Image from "next/image";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { ImageCardProps } from "~/types/index";

export const ImageCard: React.FC<{
  props: ImageCardProps;
}> = ({ props }) => {
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
        {props.graduationDate !== undefined && (
          <Typography
            gutterBottom
            color="text.secondary"
            align="left"
            style={{ fontFamily: '"myFont4", sans-serif' }}
          >
            Graduation: {props.graduationDate}
          </Typography>
        )}
        {props.major !== undefined && (
          <Typography
            gutterBottom
            color="text.secondary"
            align="left"
            style={{ fontFamily: '"myFont4", sans-serif' }}
          >
            Major: {props.major}
          </Typography>
        )}
        {props.school !== undefined && (
          <Typography
            gutterBottom
            color="text.secondary"
            align="left"
            style={{ fontFamily: '"myFont4", sans-serif' }}
          >
            School: {props.school}
          </Typography>
        )}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          gap={2}
          mt={2}
        >
          <div>
            {props.linkedInUrl !== undefined && (
              <a
                href={props.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={28} />
              </a>
            )}
          </div>
          <div>
            {props.gitHubUrl !== undefined && (
              <a
                href={props.gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={28} />
              </a>
            )}
          </div>
        </Box>
      </Container>
    </Box>
  );

  return (
    <Box padding={3}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item sm="auto">
          {imageProps}
        </Grid>
        <Grid item sm="auto">
          {textProps}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageCard;
