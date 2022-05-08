import { IUserProfile } from '@/types/user'
const PROFILE_KEY = 'RBF-USER-PROFILE'

export function setProfile(profile: IUserProfile) {
  return localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}
export function getProfile() {
  return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}')
}
export function removeProfile() {
  localStorage.removeItem(PROFILE_KEY)
}