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
        <ContentDetailsText>
          <RedirectLink
            href={`https://meshery.layer5.io/user/${details?.user_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ fontWeight: 'normal', fontSize: '1.2rem' }}>
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
