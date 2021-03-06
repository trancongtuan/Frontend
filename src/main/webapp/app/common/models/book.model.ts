export interface IBook {
  interviewSessionHistoryId?: string;
  candidateId?: string;
  calendarWeekends?: boolean;
  programObj?: any;
  productObj?: any;
  positionObj?: any;
  roundObj?: any;
  interviewers?: any[];
  converter?: any;
  option?: any;
  rank?: any;
  major?: any;
  expectPosition?: any;
  masterSchedule?: any;
  fullname?: string;
  email?: string;
  phone?: string;
  linkCv?: string;
  comment?: string;
  firstInterviewer?: any;
  secondInterviewer?: any;
  thirdInterviewer?: any;
  fourthInterviewer?: any;
  skype?: string;
  zoom?: string;
  interviewNo?: any;
  positionName?: string;
  isValidProgram?: boolean;
  isValidPosition?: boolean;
  isValidRound?: boolean;
  isValidExpectedPostition?: boolean;
  isValidMaster?: boolean;
  isValidConverter?: boolean;
  isValidRank?: boolean;
  date?: string;
  startTime?: string;
  endTime?: string;
}

export const initBookInterview: IBook = {
  candidateId: null,
  calendarWeekends: true,
  programObj: null,
  positionObj: null,
  productObj: null,
  roundObj: null,
  interviewers: null,
  converter: null,
  option: null,
  rank: null,
  major: null,
  fullname: null,
  email: null,
  phone: null,
  linkCv: null,
  comment: null,
  firstInterviewer: null,
  secondInterviewer: null,
  thirdInterviewer: null,
  fourthInterviewer: null,
  skype: null,
  zoom: null,
  expectPosition: null,
  masterSchedule: null,
  interviewNo: null,
  positionName: null,
  isValidProgram: true,
  isValidPosition: true,
  isValidRound: true,
  isValidExpectedPostition: true,
  isValidMaster: true,
  isValidConverter: true,
  isValidRank: true
};
