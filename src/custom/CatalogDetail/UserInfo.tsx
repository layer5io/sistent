import { Avatar } from '../../base';
import { CLOUD_URL } from '../../constants/constants';
import { Pattern } from '../CustomCatalog/CustomCard';
import { getVersion } from '../CustomCatalog/Helper';
import { formatDate } from './helper';
import { ContentDetailsPoints, ContentDetailsText, ContentRow, RedirectLink } from './style';
import { UserProfile } from './types';

interface UserInfoProps {
  details: Pattern;
  showVersion?: boolean;
  userProfile?: UserProfile;
}

const UserInfo: React.FC<UserInfoProps> = ({ details, showVersion = true, userProfile }) => {
  return (
    <>
      <ContentRow>
        <ContentDetailsPoints>CREATED BY</ContentDetailsPoints>
        <ContentDetailsText
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px'
          }}
        >
          <Avatar
            src={userProfile?.avatar_url}
            alt={`${userProfile?.first_name} ${userProfile?.last_name}`}
            style={{
              height: '28px',
              width: '28px'
            }}
          />
          <RedirectLink
            href={`${CLOUD_URL}/user/${details?.user_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ fontWeight: 'normal' }}>
              {userProfile?.first_name} {userProfile?.last_name}
            </span>
          </RedirectLink>
        </ContentDetailsText>
      </ContentRow>
      <ContentRow>
        <ContentDetailsPoints>CREATED AT</ContentDetailsPoints>
        <ContentDetailsText>{formatDate(details?.created_at)}</ContentDetailsText>
      </ContentRow>
      <ContentRow>
        <ContentDetailsPoints>UPDATED AT</ContentDetailsPoints>
        <ContentDetailsText>{formatDate(details?.updated_at)}</ContentDetailsText>
      </ContentRow>
      {showVersion && (
        <ContentRow>
          <ContentDetailsPoints>VERSION</ContentDetailsPoints>
          <ContentDetailsText>{getVersion(details)}</ContentDetailsText>
        </ContentRow>
      )}
    </>
  );
};

export default UserInfo;
