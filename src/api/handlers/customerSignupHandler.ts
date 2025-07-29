"use client"

import { useMutation } from "@tanstack/react-query"
import {
  customerSignupService,
  type InitiateSignupRequest,
  type VerifyOtpRequest,
  type CompleteSignupRequest,
} from "../services"

export const useInitiateSignup = () => {
  return useMutation({
    mutationFn: (request: InitiateSignupRequest) => customerSignupService.initiateSignup(request),
    onSuccess: (data) => {
      console.log("Signup initiated successfully:", data.message)
    },
    onError: (error) => {
      console.error("Signup initiation failed:", error)
    },
  })
}

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (request: VerifyOtpRequest) => customerSignupService.verifyOtp(request),
    onSuccess: (data) => {
      console.log("OTP verified successfully:", data.message)
    },
    onError: (error) => {
      console.error("OTP verification failed:", error)
    },
  })
}

export const useCompleteSignup = () => {
  return useMutation({
    mutationFn: (request: CompleteSignupRequest) => customerSignupService.completeSignup(request),
    onSuccess: (data) => {
      console.log("Signup completed successfully:", data.message)
    },
    onError: (error) => {
      console.error("Signup completion failed:", error)
    },
  })
}
