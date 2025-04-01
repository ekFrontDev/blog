export default function validateForm(formData) {
  const { username, email, password } = formData
  return (
    username.length > 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.length >= 6
  )
}

//user1
//username: user1user
//password: asdfgh
//mail: qwe@mail.ru

//user2
//username: user2user
//password: zxcvbn
//mail: zxc@mail.ru

//user3
//username: egor1egor
//password: qwerty1
//mail: egg@mail.ru

//user4
//username: benben
//password: zxcvbnm
//mail: zzz@mail.ru
