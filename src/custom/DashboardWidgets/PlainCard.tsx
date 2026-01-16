import { Box, Card, CardContent, Link, Typography } from '../../base';
import { OpenInNewIcon } from '../../icons';
import { styled } from '../../theme';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.card : theme.palette.common.white
}));

const StyledTitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
});

const StyledContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column'
});

const StyledResourceList = styled('ul')({
  paddingLeft: '1rem'
});

const ResourceListItem = styled('li')(({ theme }) => ({
  listStyleType: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.25rem',

  '&:hover': {
    color: theme.palette.primary.main
  }
}));

const StyledResourceLink = styled(Link)({
  fontSize: '1rem',
  fontWeight: '400',
  marginRight: '0.25rem',
  textDecoration: 'none',
  color: 'inherit',

  '&:hover': {
    textDecoration: 'none'
  }
});

interface Resource {
  name: string;
  link: string;
  icon?: React.ReactNode;
  external?: boolean;
}

interface PlainCardProps {
  title: string;
  icon: React.ReactNode;
  resources: Resource[];
}

export const PlainCard = ({ title, icon, resources }: PlainCardProps): JSX.Element => {
  return (
    <StyledCard>
      <CardContent>
        <StyledTitleBox>
          {icon}
          <Typography variant="h6" fontWeight="700">
            {title}
          </Typography>
        </StyledTitleBox>

        <StyledContentBox>
          <StyledResourceList>
            {resources.map((item) => (
              <ResourceListItem key={item.link}>
                <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{item.icon}</Box>

                <StyledResourceLink
                  href={item.link}
                  target={item.external ? '_blank' : '_self'}
                  rel={item.external ? 'noopener noreferrer' : ''}
                >
                  {item.name}
                </StyledResourceLink>

                {item.external && (
                  <sup>
                    <OpenInNewIcon width="12px" height="12px" fill="currentColor" />
                  </sup>
                )}
              </ResourceListItem>
            ))}
          </StyledResourceList>
        </StyledContentBox>
      </CardContent>
    </StyledCard>
  );
};
