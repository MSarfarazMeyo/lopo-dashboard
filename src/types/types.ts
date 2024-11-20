
export enum UserActivityStatus {
  active = "Active",
  deleted = "Deleted",
  suspended = "Suspended",
  blocked = "Blocked",
}

export type TGender = "male" | "female" | "default";

export interface IUser {
  userID: number;
  googleID: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  photo?: string;
  status: UserActivityStatus;
  age?: number;
  gender?: TGender;
  phone?: string;
  signUpDate: Date;
  deleteDate?: Date;
  lastActivity?: Date;
  lastLoginIP?: string;
  location?: string;
  country?: string;
  city?: string;
  address?: string;
  walletID: number;
  publicProfile?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum EnumContestStatus {
  draft = "draft",
  ongoing = "ongoing",
  upcoming = "upcoming",
  winner = "winner",
  finished = "finished",
}

export interface IContest {
  contestID: number;
  name: string;
  alias: string;
  description: string;
  preview: string;
  contentExample?: string;
  status: EnumContestStatus;
  location?: string;
  termsConditions?: string;
  startDate: Date;
  endDate: Date;
  prize?: string;
  prizePhoto?: string;
  prizeDescription?: string;
  address: string;
  creditsRequired: number;
  participantsCount: number;
  usersID?: number[];
  winnerID?: number;
  contentSubmit?: string;
}

export interface IWallet {
  walletID: number;
  userID: number;
  credits: number;
  transactionID: string;
  contestID?: number;
  creditsSpent?: number;
  payoutType?: string;
  payoutBank?: string;
  payoutAccount?: string;
  routingNumber?: string;
  swiftCode?: string;
}

export enum EnumUserParticipantStatus {
  notJoined = "notJoined",
  joinedNoContent = "joinedNoContent",
  joinedWithContent = "joinedWithContent",
  winner = "winner",
}

export type TransactionType = "wallet" | "payout";

export interface IContestCardProps {
  contestID: number;
  name: string;
  alias?: string;
  prize: string;
  preview: string;
  creditsRequired: number;
  status: EnumContestStatus;
  startDate: Date;
  location: string;
  userStatus: EnumUserParticipantStatus;
  timeLeft?: string;
  onClick: () => void;
}

export interface IContestWithUserStatus extends IContest {
  userStatus: EnumUserParticipantStatus;
  timeLeft: string;
  submittedContent?: string;
}

export interface IPlaceSuggestion {
  description: string;
  place_id: string;
}
export interface IAddressDetails {
  formattedAddress: string;
  city?: string;
  state?: string;
  country?: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  url: string;
}

export interface IReqInfoPage {
  page: string;
  format: string;
  content: string;
}

export interface IResInfoPage {
  id: number;
  page: string;
  format: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BaseTransaction {
  transactionID: number;
  userID: number;
  contestID: number;
  description: string;
  createdAt: Date;
  sessionID: string;
}

interface CreditDebitTransaction extends BaseTransaction {
  transactionType: "debit" | "credit";
  credits: number;
  summ?: never;
}

interface PayoutTransaction extends BaseTransaction {
  transactionType: "payout";
  summ: number;
  credits?: never;
}

export type ITransaction = CreditDebitTransaction | PayoutTransaction;



export interface Language {
  value: string;
  label: string;
}

export interface IHomeHow {
  title: string;
  description: string;
  imgSrc: string;
}
export interface IHomeWhy {
  img: string;
  reason: string;
}
export interface IHomeFAQ {
  question: string;
  answer: string;
}
