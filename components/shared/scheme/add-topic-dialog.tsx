'use client';

import { useForm, useFieldArray, Controller, Control } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';


// Dummy mutation for demonstration. Replace with your actual mutation.
import { useCreateSchemeOfWorkMutation } from '@/src/features/schemeOfWork/schemeOfWorkApiSlice';

type TopicFormData = {
  subject: string;
  level: string;
  term: string;
  topics: {
    week: number;
    topic: { title: string }[];
  }[];
};


export default function AddTopicDialog() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control, reset } = useForm<TopicFormData>({
    defaultValues: {
      subject: '',
      level: '',
      term: '',
      topics: [],
    },
  });

  const {
    fields: weekFields,
    append: appendWeek,
    remove: removeWeek,
  } = useFieldArray({
    control,
    name: 'topics',
  });

  const createTopicMutation = useCreateSchemeOfWorkMutation();

  const onSubmit = async (values: TopicFormData) => {
    const payload = {
      ...values,
      topics: values.topics.map((weekData) => ({
        week: weekData.week,
        topic: weekData.topic.map((t) => t.title),
      })),
    };

    try {
      await createTopicMutation[0](payload).unwrap();
      reset();
      setOpen(false);
    } catch (err) {
      console.error('Error creating scheme of work:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Plus className='h-4 w-4 mr-1' />
          Add Scheme
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Add Scheme of Work</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Subject</label>
            <Controller
              control={control}
              name='subject'
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Subject' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Mathematics'>Mathematics</SelectItem>
                    <SelectItem value='English'>English</SelectItem>
                    <SelectItem value='Basic Science'>Basic Science</SelectItem>
                    <SelectItem value='Social Studies'>
                      Social Studies
                    </SelectItem>
                    {/* Add more subjects here */}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Level */}
          <div>
            <label className='block text-sm font-medium'>Level</label>
            <Controller
              control={control}
              name='level'
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Level' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='JSS 1'>JSS 1</SelectItem>
                    <SelectItem value='JSS 2'>JSS 2</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Term */}
          <div>
            <label className='block text-sm font-medium'>Term</label>
            <Controller
              control={control}
              name='term'
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Term' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='First'>First</SelectItem>
                    <SelectItem value='Second'>Second</SelectItem>
                    <SelectItem value='Third'>Third</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Week Sections */}
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <h4 className='font-semibold'>Weeks & Topics</h4>
              <Button
                type='button'
                onClick={() =>
                  appendWeek({
                    week: weekFields.length + 1,
                    topic: [{ title: '' }],
                  })
                }
                size='sm'
              >
                Add Week
              </Button>
            </div>

            {weekFields.map((week, weekIndex) => (
              <div key={week.id} className='border rounded p-4 space-y-2'>
                <div className='flex justify-between items-center'>
                  <h5 className='font-medium'>Week {weekIndex + 1}</h5>
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={() => removeWeek(weekIndex)}
                  >
                    <Trash2 className='w-4 h-4 text-red-500' />
                  </Button>
                </div>

                <div>
                  <label className='text-sm text-muted-foreground'>
                    Week Number
                  </label>
                  <Input
                    type='number'
                    {...register(`topics.${weekIndex}.week` as const, {
                      required: true,
                    })}
                  />
                </div>

                {/* Topics for the week */}
                <WeekTopicsControl control={control} weekIndex={weekIndex} />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className='pt-4 text-right'>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type WeekTopicsControlProps = {
  control: Control<TopicFormData>;
  weekIndex: number;
};


function WeekTopicsControl({ control, weekIndex }: WeekTopicsControlProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `topics.${weekIndex}.topic`,
  });

  return (
    <div>
      <label className='block text-sm text-muted-foreground mb-1'>Topics</label>
      {fields.map((field, topicIndex) => (
        <div key={field.id} className='flex items-center gap-2 mb-2'>
          <Input
            {...control.register(
              `topics.${weekIndex}.topic.${topicIndex}.title` as const,
              {
                required: true,
              }
            )}
            placeholder={`Topic ${topicIndex + 1}`}
          />
          <Button
            type='button'
            size='icon'
            variant='ghost'
            onClick={() => remove(topicIndex)}
          >
            <Trash2 className='w-4 h-4 text-red-500' />
          </Button>
        </div>
      ))}
      <Button
        type='button'
        onClick={() => append({ title: '' })}
        size='sm'
        variant='outline'
      >
        Add Topic
      </Button>
    </div>
  );
}
