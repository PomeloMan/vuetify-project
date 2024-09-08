import http from '@/apis/config/index'
import { AxiosRequestConfig } from 'axios'
import { Action, Module } from './module'

export function getRequestUrl(module: Module = Module.MAIN, action: Action | string) {
  return module ? module + `/${action}` : `/${action}`
}

export function list<R>(module?: Module): Promise<R> {
  return get(getRequestUrl(module, Action.LIST))
}

export function page<T, R>(module?: Module, data?: T): Promise<R> {
  return post(getRequestUrl(module, Action.PAGE), data)
}

export function detail<R>(module?: Module): Promise<R> {
  return get(getRequestUrl(module, Action.DETAIL))
}

export function create<T, R>(module?: Module, data?: T): Promise<R> {
  return post(getRequestUrl(module, Action.CREATE), data)
}

export function update<T, R>(module?: Module, data?: T): Promise<R> {
  return put(getRequestUrl(module, Action.UPDATE), data)
}

export function remove<R>(module?: Module): Promise<R> {
  return del(getRequestUrl(module, Action.DELETE))
}

export function upload<T, R>(module?: Module, data?: T): Promise<R> {
  return post(getRequestUrl(module, Action.UPLOAD), data)
}

export function download<T, R>(module?: Module, data?: T): Promise<R> {
  return post(getRequestUrl(module, Action.DOWNLOAD), data)
}

export function get<R>(path: string): Promise<R> {
  return http.get(path)
}

export function post<T, R>(path: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
  return http.post(path, data, config)
}

export function put<T, R>(path: string, data?: T): Promise<R> {
  return http.put(path, data)
}

export function del<R>(path: string): Promise<R> {
  return http.delete(path)
}
