"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function StepTabs() {
    const [step, setStep] = useState<"product" | "variants">("product")

    const nextStep = () => setStep("variants")
    const prevStep = () => setStep("product")

    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Tabs value={step}>
                {/* TabsList vẫn hiển thị nhưng disable click */}
                <TabsList>
                    <TabsTrigger value="product" disabled>
                        Product
                    </TabsTrigger>
                    <TabsTrigger value="variants" disabled>
                        Variants
                    </TabsTrigger>
                </TabsList>

                {/* Step 1 */}
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click next when you&apos;re done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Name</Label>
                                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-username">Username</Label>
                                <Input id="tabs-demo-username" defaultValue="@peduarte" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={nextStep}>Next</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Step 2 */}
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you&apos;ll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-current">Current password</Label>
                                <Input id="tabs-demo-current" type="password" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-new">New password</Label>
                                <Input id="tabs-demo-new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={prevStep}>Previous</Button>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
