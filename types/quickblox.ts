export interface User {
  id: number;
  full_name: string;
  email: string;
  login: string;
  phone: any;
  website: any;
  created_at: string;
  updated_at: string;
  last_request_at: string;
  external_user_id: any;
  facebook_id: any;
  blob_id: any;
  custom_data: any;
  age_over16: boolean;
  parents_contacts: string;
  user_tags: string;
}

export interface Dialog {
  _id: string;
  created_at: string;
  last_message: string;
  last_message_date_sent: number;
  last_message_id: string;
  last_message_user_id: number;
  name: string;
  occupants_ids: number[];
  photo: any;
  type: number;
  updated_at: string;
  user_id: number;
  xmpp_room_jid: any;
  unread_messages_count: number;
}

export interface ChatItem {
  _id: string;
  all_read: boolean;
  attachments: ChatAttachment[];
  chat_dialog_id: string;
  created_at: string;
  date_sent: number;
  delivered_ids: number[];
  message: string;
  read_ids: number[];
  recipient_id: number;
  sender_id: number;
  updated_at: string;
  read: number;
}

export interface ChatAttachment {
  id: string;
  type: string;
  url: string;
}

export interface UploadedFile {
  id: number;
  uid: string;
  content_type: string;
  name: string;
  size: number;
  created_at: Date;
  updated_at: Date;
  blob_status: null;
  set_completed_at: null;
  public: boolean;
  account_id: number;
  app_id: number;
  blob_object_access: BlobObjectAccess;
}

export interface BlobObjectAccess {
  id: number;
  blob_id: number;
  expires: Date;
  object_access_type: string;
  params: string;
}
