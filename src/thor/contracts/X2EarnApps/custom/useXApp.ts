import { useMemo } from "react"
import { useXApps } from "@thor/contracts/X2EarnApps"
import { NETWORK_TYPE } from "@config/network";

/**
 *  Hook to get a specific xApp using useXApps
 * @param networkType
 * @param appId  the xApp id
 * @returns  the xApp with the given id
 */
export const useXApp = (networkType: NETWORK_TYPE, appId: string) => {
  const { data: xApps, ...props } = useXApps(networkType)

  const allApps = useMemo(() => [...(xApps?.active ?? []), ...(xApps?.unendorsed ?? [])], [xApps])
  const app = allApps.find(xa => xa.id === appId)

  return {
    data: app,
    ...props,
  }
}
