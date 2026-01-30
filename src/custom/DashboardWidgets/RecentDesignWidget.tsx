import { KeyboardArrowRight } from '@mui/icons-material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  IconButton,
  Link,
  Tooltip,
  Typography
} from '../../base';
import { iconMedium } from '../../constants/iconsSizes';
import { AddIcon, OpenInNewIcon } from '../../icons';
import { useTheme } from '../../theme';
import { getFullFormattedTime, getRelativeTime } from '../../utils';
import { CustomTooltip } from '../CustomTooltip';
import { Modal, ModalBody } from '../Modal';

interface Resource {
  link: string;
  name: string;
  icon?: React.ReactNode;
  external?: boolean;
  timestamp: string;
}

interface CardData {
  id: string;
  title: string;
  image: React.ReactNode;
  redirect?: string;
  video?: string;
}

type SortOrder = 'updated_at asc' | 'updated_at desc';

interface DesignCardProps {
  title: string;
  isPatternsFetching: boolean;
  description?: string;
  actionButton?: boolean;
  icon?: React.ReactNode;
  resources: Resource[];
  href?: string;
  onClick?: () => void;
  btnTitle?: string;
  sortOrder: string;
  setSortOrder: (order: SortOrder) => void;
  cardData: CardData[];
}

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
});

const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const TitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
});

const ResourcesList = styled('ul')({
  paddingLeft: '1rem',
  margin: '0'
});

const ResourceItem = styled('li')(({ theme }) => ({
  listStyleType: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.25rem',

  '&:hover': {
    color: theme.palette.primary.main
  }
}));

const ResourceLink = styled(Link)({
  fontSize: '1rem',
  fontWeight: '400',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '12rem',
  textDecoration: 'none',
  color: 'inherit',

  '&:hover': {
    textDecoration: 'none'
  }
});

const TimestampText = styled(Typography)({
  marginLeft: 'auto'
});

const LoaderContainer = styled(Box)({
  height: '10rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const EmptyStateText = styled(Typography)(({ theme }) => ({
  margin: '0.5rem',
  color: theme.palette.text.disabled
}));

const StyledModalBody = styled(ModalBody)({
  display: 'grid',
  gap: '1rem',
  padding: '2rem'
});

const DesignCard: React.FC<DesignCardProps> = ({
  title,
  isPatternsFetching,
  description,
  actionButton,
  icon,
  resources,
  href,
  onClick,
  btnTitle,
  sortOrder,
  setSortOrder,
  cardData
}) => {
  const [createModal, setCreateModal] = useState({ open: false });
  const theme = useTheme();

  const handleChange = () => {
    setSortOrder(sortOrder === 'updated_at desc' ? 'updated_at asc' : 'updated_at desc');
  };

  const handleCreateModalOpen = async () => {
    setCreateModal({
      open: true
    });
  };

  const handleCreateModalClose = () => {
    setCreateModal({
      open: false
    });
  };

  return (
    <>
      <Card
        sx={{
          height: '100%',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.background.card
              : theme.palette.common.white
        }}
      >
        <StyledCardContent>
          <HeaderContainer>
            <TitleContainer>
              {icon}
              <Typography variant="h6" fontWeight="700">
                {title}
              </Typography>
            </TitleContainer>
            <CatalogSortByToggle sortOrder={sortOrder} handleChange={handleChange} />
          </HeaderContainer>

          {isPatternsFetching ? (
            <LoaderContainer>
              <CircularProgress />
            </LoaderContainer>
          ) : resources.length === 0 ? (
            <EmptyStateText variant="body1" align="left">
              No designs found
            </EmptyStateText>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {description && (
                <Typography component="div" sx={{ mx: 1 }}>
                  {description}
                </Typography>
              )}
              <>
                <ResourcesList>
                  {resources.map((item) => (
                    <ResourceItem key={item.link}>
                      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                           {item.icon}
                      </Box>
                      <ResourceLink href={item.link}>{item.name}</ResourceLink>

                      {item.external == true ? (
                        <>
                          <sup>
                            <OpenInNewIcon
                              width="12px"
                              height="12px"
                              fill={theme.palette.common.white}
                            />
                          </sup>
                        </>
                      ) : (
                        ''
                      )}

                      <TimestampText component="span">
                        <RelativeFormattedDate
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: '300'
                          }}
                          date={item.timestamp}
                        />
                      </TimestampText>
                    </ResourceItem>
                  ))}
                </ResourcesList>
              </>
            </Box>
          )}

          {actionButton && (
            <CardActions>
              <Button
                variant="contained"
                href={href || undefined}
                onClick={onClick || undefined}
                size="small"
              >
                {btnTitle}
              </Button>
              <Button variant="contained" onClick={handleCreateModalOpen}>
                <AddIcon style={iconMedium} fill={'white'} />
              </Button>
            </CardActions>
          )}
        </StyledCardContent>
      </Card>
      <CreateDesignModal
        openModal={createModal.open}
        handleClose={handleCreateModalClose}
        cardData={cardData}
      />
    </>
  );
};

export default DesignCard;

interface CatalogSortByToggleProps {
  sortOrder: string;
  handleChange: () => void;
}

const CatalogSortByToggle: React.FC<CatalogSortByToggleProps> = ({ sortOrder, handleChange }) => {
  const isAscending = sortOrder === 'updated_at asc';

  return (
    <CustomTooltip
      title={isAscending ? 'Sort by Most Recently Updated' : 'Sort by Least Recently Updated'}
      placement="top"
    >
      <IconButton onClick={handleChange} aria-label="Sort by" size="small">
        <SwapVertIcon
          style={{ transform: isAscending ? 'rotate(0deg)' : 'rotate(180deg)' }}
          fontSize="small"
        />
      </IconButton>
    </CustomTooltip>
  );
};

interface RelativeFormattedDateProps {
  date: string;
  style?: React.CSSProperties;
}

const RelativeFormattedDate: React.FC<RelativeFormattedDateProps> = ({ date, style }) => {
  return (
    <Tooltip title={getFullFormattedTime(date)} placement="top">
      <div>
        <Typography
          style={{
            fontStyle: 'italic',
            ...style
          }}
        >
          {getRelativeTime(date)}
        </Typography>
      </div>
    </Tooltip>
  );
};

const CardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  boxShadow: 'none',
  cursor: 'pointer',
  background: theme.palette.text.inverse,
  border: `2px solid ${theme.palette.background.secondary}`,
  '&:hover': {
    background: theme.palette.background.default,
    border: `2px solid ${theme.palette.background.brand?.default}`
  },
  '@media(max-width: 376px)': {
    width: '18rem'
  },
  gap: 15,
  padding: '0.3rem'
}));

const ImageWrapper = styled('div')(() => ({
  marginLeft: '20px',
  position: 'relative',
  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  '& > video': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));

interface BoxContainerProps {
  title: string;
  image: React.ReactNode;
  onClick: () => void;
}

const BoxContainer: React.FC<BoxContainerProps> = ({ title, image, onClick }) => {
  return (
    <>
      <div onClick={onClick}>
        <CardWrapper>
          <ImageWrapper>{image}</ImageWrapper>
          <Typography
            variant="body1"
            align="center"
            fontWeight="500"
            component="div"
            style={{}}
            sx={{ mt: 1, mb: 1 }}
          >
            {title}
          </Typography>
          <KeyboardArrowRight
            sx={{
              position: 'absolute',
              right: '40px'
            }}
            width={24}
          />
        </CardWrapper>
      </div>
    </>
  );
};

interface CreateDesignModalProps {
  openModal: boolean;
  handleClose: () => void;
  cardData: CardData[];
}

export const CreateDesignModal: React.FC<CreateDesignModalProps> = ({
  openModal,
  handleClose,
  cardData
}) => {
  return (
    <Modal
      open={openModal}
      title="Choose a method to create a design"
      closeModal={handleClose}
      maxWidth="xs"
    >
      <StyledModalBody>
        {cardData.map((card) => (
          <BoxContainer
            key={card.id}
            onClick={() => {
              if (card.redirect) {
                window.location.href = card.redirect;
              } else {
                console.error('No redirect URL provided for card with title: ', card.title);
              }
            }}
            title={card.title}
            image={card.image}
          />
        ))}
      </StyledModalBody>
    </Modal>
  );
};
