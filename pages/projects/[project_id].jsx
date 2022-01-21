import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  IconButton,
  Divider,
  Box,
  Grid,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import PageTitle from '@components/PageTitle';
import Link from '@components/MuiNextLink';
import CenterTitle from '@components/CenterTitle';
import RelatedLinks from '@components/RelatedLinks/RelatedLinks';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import PublicIcon from '@mui/icons-material/Public';
import ShareIcon from '@mui/icons-material/Share';
import theme from '@styles/theme';
import CopyToClipboard from '@components/CopyToClipboard';
import DiscordIcon from '@components/DiscordIcon';
import { useEffect, useState } from 'react';
import axios from 'axios';

const relatedLinkList = [
  {
    id: 0,
    title: 'Documentation',
    caption: 'Read about how Ergopad Works',
    icon: 'auto_stories',
    href: 'https://github.com/ergo-pad/ergopad/blob/main/docs/README.md',
    background: theme.palette.primary.main,
  },
  {
    id: 1,
    title: 'About',
    caption: 'Learn more about who we are',
    icon: 'emoji_people',
    href: '/about',
    background: theme.palette.secondary.main,
  },
  {
    id: 2,
    title: 'Apply for IDO',
    caption: 'Submit your own project proposal',
    icon: 'chat',
    href: '/apply',
    background: theme.palette.tertiary.main,
  },
];

const Project = () => {
  const router = useRouter();
  const { project_id } = router.query;
  const [isLoading, setLoading] = useState(true);
  const [project, setProject] = useState({});

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `${process.env.API_URL}/projects/${project_id}`
        );
        setProject(res.data);
      } catch {
        setProject(null);
      }
      setLoading(false);
    };

    if (project_id) getProject();
  }, [project_id]);

  const MultilineProjectDescription = ({ description }) => {
    // double '\n' creates a new paragraph
    const parsed = description.split('\n\n');
    return (
      <>
        {parsed.map((paragraph, index) => (
          <Typography variant="p" key={index}>
            {paragraph}
          </Typography>
        ))}
      </>
    );
  };

  return (
    <>
      {project ? (
        <>
          {isLoading && (
            <Container sx={{ mb: '3rem' }}>
              <CircularProgress
                size={24}
                sx={{
                  position: 'relative',
                  left: '50%',
                  marginLeft: '-12px',
                  marginTop: '120px',
                }}
              />
            </Container>
          )}
          {!isLoading && (
            <Container maxWidth="760px" sx={{ maxWidth: '760px', mx: 'auto' }}>
              <img
                src={project.bannerImgUrl}
                alt={project.name}
                height="50%"
                width="100%"
              />
              <Box sx={{ mt: '-5rem' }}>
                <PageTitle title={project.name} />
              </Box>
              {/* <Typography variant="h4">Summary:</Typography> */}
              <Typography variant="h5">{project.shortDescription}</Typography>
              <Typography variant="h4">
                Funds raised:{' '}
                {project.fundsRaised ? project.fundsRaised : 'N/A'}
              </Typography>
              <Divider sx={{ width: '100%', mb: '1.5rem' }} />
              <Typography variant="h4">Description</Typography>
              {project.description ? (
                <MultilineProjectDescription
                  description={project.description}
                />
              ) : (
                <Typography variant="p">
                  Update project description for content in this section.
                </Typography>
              )}
              <Divider sx={{ width: '100%', mb: '1.5rem' }} />
              <Typography variant="h4">Meet the team</Typography>
              {/* todo: Add rendering for team */}
              <Typography variant="p">
                Update team description for content in this section.
              </Typography>
              {/* socials go here */}
              <Grid container item>
                {project?.socials?.discord ? (
                  <Link
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    href={project.socials.discord}
                    aria-label="discord"
                    title="Discord"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <IconButton aria-label="discord">
                      <DiscordIcon />
                    </IconButton>
                  </Link>
                ) : null}
                {project?.socials?.github ? (
                  <Link
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    href={project.socials.github}
                    aria-label="github"
                    title="GitHub"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <IconButton aria-label="github">
                      <GitHubIcon />
                    </IconButton>
                  </Link>
                ) : null}
                {project?.socials?.telegram ? (
                  <Link
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    href={project.socials.telegram}
                    aria-label="Telegram"
                    title="Telegram"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <IconButton aria-label="telegram">
                      <TelegramIcon />
                    </IconButton>
                  </Link>
                ) : null}
                {project?.socials?.twitter ? (
                  <Link
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    href={project.socials.twitter}
                    aria-label="twitter"
                    title="Twitter"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <IconButton aria-label="twitter">
                      <TwitterIcon />
                    </IconButton>
                  </Link>
                ) : null}
                {project?.socials?.website ? (
                  <Link
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    href={project.socials.website}
                    aria-label="website"
                    title="Web"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <IconButton aria-label="website">
                      <PublicIcon />
                    </IconButton>
                  </Link>
                ) : null}
                <CopyToClipboard>
                  {({ copy }) => (
                    <IconButton
                      aria-label="share"
                      onClick={() => copy(window.location)}
                    >
                      <ShareIcon />
                    </IconButton>
                  )}
                </CopyToClipboard>
              </Grid>
            </Container>
          )}
        </>
      ) : (
        <CenterTitle
          title="Oops..."
          subtitle="Looks like the project you are looking for doesn't exist."
          main={true}
        />
      )}
      <RelatedLinks title="Learn More" subtitle="" links={relatedLinkList} />
    </>
  );
};

export default Project;
