import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
var bcrypt = require('bcryptjs')
import {
    Stack,
    HStack,
    Button,
    Input,
    Select,
    Box,
    Text,
    FormLabel,
    useToast
} from '@chakra-ui/react'
import "flatpickr/dist/themes/material_green.css";
import DatePicker from "react-flatpickr";
import axios from 'axios';

const Dashboard = () => {
    const Toast = useToast({
        position: 'top'
    })
    const savedToken = Cookies.get("authToken")
    const [absentDates, setAbsentDates] = useState([])
    const [existingCoupons, setExistingCoupons] = useState([])

    const [code, setCode] = useState("")
    const [value, setValue] = useState("")
    const [type, setType] = useState("flat")
    const [identifier, setIdentifier] = useState("")


    useEffect(() => {
        // if (!savedToken || !bcrypt.compare(savedToken, process.env.NEXT_PUBLIC_SALT)) {
        //     Cookies.remove("authToken")
        //     window.location.assign("/")
        // }
        getAvailability()
        getCoupons() 
    }, [])

    useEffect(() => {
        getCoupons()
        getAvailability()
    }, [])

    function logout() {
        Cookies.remove("authToken")
        setTimeout(() => {
            window.location.assign('/')
        }, 2000)
    }

    function getAvailability() {
        axios.get('/api/absent').then(res => {
            setAbsentDates(res.data[0].dates || [])
        }).catch(err => {
            console.log(err)
        })
    }
    function getCoupons() {
        axios.get('/api/coupon').then(res => {
            setExistingCoupons(res.data)
        }).catch(err => {
            Toast({
                status: 'error',
                description: "Could not fetch your coupons"
            })
        })
    }


    function createCoupon() {
        axios.post('api/coupon', {
            code: code,
            value: value,
            type: type,
            identifier: identifier
        }).then(res => {
            getCoupons()
            Toast({
                status: 'success',
                description: 'Coupon created!'
            })
        }).catch(err => {
            console.log(err)
            Toast({
                status: 'error',
                description: "Could not create coupon"
            })
        })
    }

    function deleteCoupon(couponCode) {
        axios.put('api/coupon', {
            code: couponCode,
        }).then(res => {
            getCoupons()
            Toast({
                status: 'success',
                description: 'Coupons updated!'
            })
        }).catch(err => {
            Toast({
                status: 'error',
                description: "Could not delete coupon"
            })
        })
    }

    function updateAvailability() {
        axios.post('/api/absent', { dates: absentDates }).then(res => {
            getAvailability()
            Toast({
                status: 'success',
                description: 'Availability updated!'
            })
        }).catch(err => {
            Toast({
                status: 'error',
                description: "Could not fetch your availability"
            })
        })
    }

    return (
        <>
            <Box p={[4, 8]}>
                <HStack p={3} bg={'yellow.50'} rounded={8} boxShadow={'sm'} justifyContent={'space-between'}>
                    <Text fontSize={'lg'} fontWeight={'600'}>Slayitwithskin Admin Panel</Text>
                    <Button size={'sm'} colorScheme={'red'} onClick={logout}>Logout</Button>
                </HStack>
                <Stack
                    direction={['column', 'row']}
                    justifyContent={'center'}
                    gap={24}
                >
                    <Box>
                        <Text my={8}>Unavailable Days</Text>
                        <Box
                            padding={2} my={8} overflow={'hidden'}
                            border={'1px solid #999'} rounded={8}
                            color={'white'} w={'56'} pos={'relative'}
                            zIndex={10}
                        >
                            <Text color={'#888'} position={'absolute'} zIndex={0}>Select here</Text>
                            <DatePicker
                                value={absentDates}
                                options={{
                                    mode: 'multiple',
                                    allowInput: false,
                                    defaultDate: absentDates,
                                    dateFormat: 'd-m-Y'
                                }}
                                onChange={(date) => {
                                    setAbsentDates(date)
                                }}
                            />
                        </Box>
                        <Button colorScheme='twitter' my={8} onClick={updateAvailability}>Save</Button>
                    </Box>

                    <Box>
                        <Text my={8}>Create New Coupon</Text>
                        <Box p={4} bg={'aqua'} rounded={12} w={'sm'}>
                            <FormLabel>Coupon Code</FormLabel>
                            <Input value={code} onChange={e=>setCode(e.target.value)} textTransform={'capitalize'} bg={'#FFF'} />
                            <br /><br />
                            <FormLabel>Discount Value</FormLabel>
                            <Input value={value} onChange={e=>setValue(e.target.value)} type={'number'} bg={'#FFF'} />
                            <br /><br />
                            <FormLabel>Discount Type</FormLabel>
                            <Select bg={'#FFF'}  value={type} onChange={e=>setType(e.target.value)}>
                                <option value="flat">Flat</option>
                                <option value="percent">Percent</option>
                            </Select>
                            <br />
                            <FormLabel>Identifier</FormLabel>
                            <Input value={identifier} onChange={e=>setIdentifier(e.target.value)} bg={'#FFF'} placeholder='for your reference' />
                            <br /><br /><br />
                            <Button colorScheme='whatsapp' w={'full'} onClick={createCoupon}>Save</Button>
                        </Box>
                        <Box mt={16}>
                            <Text>Your Past Coupons</Text>
                            {
                                existingCoupons.map((coupon, key) => (

                                    <Box my={6} bg={'blanchedalmond'} p={4} rounded={8} key={key}>
                                        <Text>{coupon.identifier}</Text>
                                        <Text>{coupon.value} {coupon.type}</Text>
                                        <Text>Code: {coupon.code}</Text>
                                        <HStack justifyContent={'flex-end'}>
                                            <Button colorScheme='red' size={'xs'} onClick={()=>deleteCoupon(coupon.code)}>DELETE</Button>
                                        </HStack>
                                    </Box>

                                ))
                            }

                        </Box>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}

export default Dashboard