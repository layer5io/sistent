import { Pattern } from '../CustomCatalog/CustomCard';
import { getVersion } from '../CustomCatalog/Helper';
import { formatDate } from './helper';
import { ContentDetailsPoints, ContentDetailsText, ContentRow, RedirectLink } from './style';

interface UserInfoProps {
  details: Pattern;
  showVersion?: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ details, showVersion = true }) => {
  return (
    <>
      <ContentRow>
        <ContentDetailsPoints>CREATED BY</ContentDetailsPoints>
        <ContentDetailsText>
          <RedirectLink href={`/user/${details?.user_id}`} rel="noreferrer">
            <span style={{ fontWeight: 'normal' }}>
              {details.user.first_name} {details?.user?.last_name}
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
