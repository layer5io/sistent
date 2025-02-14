import { Box, Card, CardContent, Link, Typography } from '../../base';
import { OpenInNewIcon } from '../../icons';
import { styled } from '../../theme';

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
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

const ResourceListItem = styled('li')({
  listStyleType: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});

const StyledResourceIcon = styled('img')({
  width: '12px',
  height: '12px',
  marginRight: '.25rem'
});

const StyledResourceLink = styled(Link)({
  fontSize: '1rem',
  fontWeight: '400',
  marginRight: '0.25rem',
  textDecoration: 'none'
});

interface Resource {
  name: string;
  link: string;
  icon?: string;
  external?: boolean;
}

interface PlainCardProps {
  title: string;
  icon: React.ReactNode;
  resources: Resource[];
}

export const PlainCard = ({ title, icon, resources }: PlainCardProps): JSX.Element => {
  return (
    <>
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
                  {item.icon && (
                    <StyledResourceIcon src={item.icon} alt={`Icon for ${item.name}`} />
                  )}
                  <StyledResourceLink
                    href={item.link}
                    target={item.external ? '_blank' : '_self'}
                    rel={item.external ? 'noopener noreferrer' : ''}
                  >
                    {item.name}
                  </StyledResourceLink>

                  {item.external && (
                    <sup>
                      <OpenInNewIcon width="12px" height="12px" fill={'white'} />
                    </sup>
                  )}
                </ResourceListItem>
              ))}
            </StyledResourceList>
          </StyledContentBox>
        </CardContent>
      </StyledCard>
    </>
  );
};
