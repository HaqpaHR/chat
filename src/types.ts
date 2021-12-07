

export interface Users {
  id: number,
  name: string,
  icon: string,
  messages: Message[],
}

export interface Message {
  type: string,
  msg: string,
  time: number,
}
