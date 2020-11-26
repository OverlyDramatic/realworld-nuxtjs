import request from '@/utils/request'

export async function loginApi(data) {
  return await request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

export async function signUpApi(data) {
  return await request({
    method: 'POST',
    url: '/api/users',
    data
  })
}
