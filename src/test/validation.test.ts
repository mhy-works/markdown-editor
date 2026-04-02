import { describe, it, expect } from 'vitest'
import { validateTitle, validateBody } from '../utils/validation'

describe('validateTitle', () => {
  it('空文字の場合エラーを返す', () => {
    expect(validateTitle('')).not.toBe('')
  })

  it('51文字以上の場合エラーを返す', () => {
    expect(validateTitle('a'.repeat(51))).not.toBe('')
  })

  it('1文字以上50文字以下の場合エラーを返さない', () => {
    expect(validateTitle('タイトル')).toBe('')
  })
})

describe('validateBody', () => {
  it('9文字以下の場合エラーを返す', () => {
    expect(validateBody('短い')).not.toBe('')
  })

  it('2001文字以上の場合エラーを返す', () => {
    expect(validateBody('a'.repeat(2001))).not.toBe('')
  })

  it('10文字以上2000文字以下の場合エラーを返さない', () => {
    expect(validateBody('これは10文字以上の本文です')).toBe('')
  })
})
