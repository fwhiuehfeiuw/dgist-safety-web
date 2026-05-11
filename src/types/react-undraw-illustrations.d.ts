declare module 'react-undraw-illustrations' {
  import { ComponentType } from 'react';

  interface UndrawProps {
    primaryColor?: string;
    height?: string | number;
    width?: string | number;
    skinColor?: string;
    hairColor?: string;
    accentColor?: string;
    className?: string;
    style?: React.CSSProperties;
  }

  type UndrawComponent = ComponentType<UndrawProps>;

  export const UndrawAlienScience: UndrawComponent;
  export const UndrawAtWork: UndrawComponent;
  export const UndrawChecklist: UndrawComponent;
  export const UndrawConnectingTeams: UndrawComponent;
  export const UndrawCoworkers: UndrawComponent;
  export const UndrawCoWorking: UndrawComponent;
  export const UndrawEatingTogether: UndrawComponent;
  export const UndrawEmailCapture: UndrawComponent;
  export const UndrawEmails: UndrawComponent;
  export const UndrawGoal: UndrawComponent;
  export const UndrawHello: UndrawComponent;
  export const UndrawJavascriptFrameworks: UndrawComponent;
  export const UndrawMail: UndrawComponent;
  export const UndrawMailbox: UndrawComponent;
  export const UndrawMailSent: UndrawComponent;
  export const UndrawQaEngineers: UndrawComponent;
  export const UndrawSafe: UndrawComponent;
  export const UndrawScience: UndrawComponent;
  export const UndrawSecureData: UndrawComponent;
  export const UndrawSecureServer: UndrawComponent;
  export const UndrawSocialNetworking: UndrawComponent;
  export const UndrawTeam: UndrawComponent;
  export const UndrawTeamSpirit: UndrawComponent;
  export const UndrawTogether: UndrawComponent;
  export const UndrawWelcome: UndrawComponent;
  export const UndrawWorkChat: UndrawComponent;
  export const UndrawWorking: UndrawComponent;
  export const UndrawWorkingLate: UndrawComponent;
  export const UndrawWorkout: UndrawComponent;
  export const UndrawWorkTime: UndrawComponent;
  export const UndrawAddress: UndrawComponent;
  export const UndrawBuilding: UndrawComponent;
  export const UndrawMapDark: UndrawComponent;
  export const UndrawMapLight: UndrawComponent;
  export const UndrawAgreement: UndrawComponent;
  export const UndrawDocuments: UndrawComponent;
  export const UndrawConversation: UndrawComponent;
  export const UndrawConnected: UndrawComponent;
  export const UndrawNotebook: UndrawComponent;
  export const UndrawAcceptTerms: UndrawComponent;

  // generic fallback for other undraw exports
  const x: { [key: string]: UndrawComponent };
  export default x;
}
