export interface SNSLink {
  label: string;
  url: string;
}

export interface MemberCardProps {
  name: string;
  position: string;
  quote: string;
  photo?: string;
  sns?: SNSLink[];
}