import request from '@/utils/request'

enum API {
  ALLUSER_URL = '/admin/acl/user',
}
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any>(API.ALLUSER_URL + `${page}/${limit}`)
