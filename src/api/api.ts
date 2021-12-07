const URL = 'https://ice.dating/get_data.js';
const URL_SEND = 'https://ice.dating/set_data.js';

export function getData(){
    return fetch(URL, {method: 'GET', mode: 'cors'})
    .then(todos => todos?.text())
  };

export const getMessages = async (id: number) => {
  let data = await getData();
  let result = eval(data);
  let selectedUserData = result.filter((user: { id: any; }) => user.id === id);
  return selectedUserData[0];
}

export const sendData = async (id:number, message:string): Promise<void> => {
  const data = `{to_user_id: ${id}, msg: ${message}}`;
  try {
    const response = await fetch(URL_SEND, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'text/html'
      }
    });
    const json = await response.text();
    console.log('Успех:', json);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}
