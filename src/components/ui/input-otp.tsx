"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number; mask?: boolean | string }
>(({ index, className, mask, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  const [showPlain, setShowPlain] = React.useState(false)
  const prevCharRef = React.useRef(char)

  React.useEffect(() => {
    if (char && char !== prevCharRef.current) {
      setShowPlain(true)
      const timer = setTimeout(() => {
        setShowPlain(false)
      }, 1500)
      prevCharRef.current = char
      return () => clearTimeout(timer)
    }
    prevCharRef.current = char
  }, [char])

  React.useEffect(() => {
    if (!inputOTPContext.isFocused) {
      setShowPlain(false)
    }
  }, [inputOTPContext.isFocused])

  let displayChar: React.ReactNode = char

  if (mask && char) {
    const maskChar = typeof mask === "string" ? mask : "*"
    const hasNextChar = inputOTPContext.slots
      .slice(index + 1)
      .some((s) => s.char !== null)

    if (hasNextChar || !showPlain || !inputOTPContext.isFocused) {
      displayChar = maskChar
    } else {
      displayChar = char
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      )}
      {...props}
    >
      {displayChar}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
