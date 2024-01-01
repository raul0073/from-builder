'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ImSpinner2 } from 'react-icons/im'
import { BsFileEarmarkPlus } from 'react-icons/bs'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '../ui//form'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

import { formSchema, formSchemaType } from '@/schema/form'
import { toast } from '../ui/use-toast'
import { createForm } from '@/actions/form'



export default function FormButton() {

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema)
    });

    async function onSubmit(values: formSchemaType){
       try {
         const formId = await createForm(values)
         toast({
            title: 'Alright 🤙',
            description: 'Form created!'
        })
        console.log('FormId:', formId);
       } catch (error) {
            toast({
                title: 'Error ⛔️',
                description: 'Something went wrong... try again',
                variant: 'destructive'
            })
       }
    }
  return (
    <>
        <Dialog>
            <DialogTrigger asChild>
                <Button
                variant={'outline'}
                className='group border border-primary/20 h-[190px]
                 items-center justify-center flex flex-col
                 hover:cursor-pointer border-dashed gap-4'
                >
                     <BsFileEarmarkPlus
                     className='h-8 w-8
                      text-muted-foreground group-hover:text-primary'
                     />
                     <p className='font-bold text-xl text-muted-foreground group-hover:text-primary'>
                     Create form
                     </p>
                     </Button>
            </DialogTrigger>
            <DialogContent>

            <DialogHeader>
                <DialogTitle>
                    Create Form
                </DialogTitle>
                <DialogDescription>
                    Create a new form
                </DialogDescription>
            </DialogHeader>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField 
                    control={form.control}
                    name="name"
                    render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                    control={form.control}
                    name="description"
                    render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea rows={5} {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <DialogFooter>
                <Button 
                onClick={form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting} className='w-full mt-4'>
                        {!form.formState.isSubmitting && <span>Save</span>}
                        {form.formState.isSubmitting && <ImSpinner2 className='animate-spin' />}
                </Button>
            </DialogFooter>
            <div className="flex flex-4 gap-4 py-4"></div>
            </DialogContent>
        </Dialog>
    </>
  )
}
