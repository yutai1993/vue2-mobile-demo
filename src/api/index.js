import { $ajax } from './axios'

// export const reqRotation = (params)=>{return $ajax({url:"/ajax/Rotation"})}

export const reqRotation = (params)=> $ajax({url:"/ajax/Rotation"})

export const reqCtNav = (params) => $ajax({url: "/ajax/navImg"})

export const reqDetail = (params) => $ajax({url: "/ajax/detail"})

export const reqDetailItem = (params) => $ajax(params)

export const reqsenior = (params) => $ajax({url: "/ajax/senior"})

export const reqsort = (params) => $ajax({url: "/ajax/sort"})

export const reqSearchList = (params) => $ajax(params)

export const reqCartList = (params) => $ajax(params)




