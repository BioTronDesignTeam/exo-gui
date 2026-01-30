'use client'

import { useEffect } from "react"
import { PageStateStore } from "../PageStateStore"
import { ActionType, usePageDispatch } from "../PageState"


export function PageUpdateDriver() {
  const dispatch = usePageDispatch()

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({
        action_type: ActionType.UPDATE_PAGE,
        payload: {
          ...PageStateStore
        }
      })
    }, 1000 / 60)

    return () => clearInterval(id)
  }, [dispatch])

  return null
}