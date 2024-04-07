import React from 'react'
import {z} from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import categories from './categories'
import { invalidSchemaErrorData } from '@hookform/resolvers/valibot/src/__tests__/__fixtures__/data.js'

interface Props{
    onSubmit:(data: ExpenseFormData) => void;
}

const schema=z.object({
    description:z.string().min(3).max(50),
    amount:z.number({invalid_type_error:'Amount is required'}
    ).min(0.01).max(100_000),
    category:z.enum(categories)
});

type ExpenseFormData = z.infer<typeof schema>;
const ExpenseForm = ({onSubmit}: Props) => {
  const {register,handleSubmit,reset,formState:{errors}} = useForm<ExpenseFormData>({resolver: zodResolver(schema)});


  return (
    <form onSubmit={handleSubmit(data=> {onSubmit(data);reset();})}>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input { ...register("description")} type="text" id="description"     className='form-control'/>
            {errors.description && <p className='text-danger'>{errors.description.message}</p>}
        </div>
        <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            </div>
            <input {...register("amount",{valueAsNumber: true})} type="text" id="amount" className="form-control" />
            {errors.amount && <p className='text-danger'>{errors.amount.message}</p>}
        <div className="mb-3">
            <label htmlFor="" className="form-label">Category</label>
            <select {...register("category")} id="category" className="form-select">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className='text-danger'>{errors.category.message}</p>}
            </div>
            <button className="btn bnt-primary">Submit</button>
    </form>
  )
}

export default ExpenseForm