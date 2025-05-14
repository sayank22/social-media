import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostListContext } from '../store/post-list-store';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      photo: '',
      title: '',
      body: '',
      tags: '',
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const token = localStorage.getItem('token');

    if (!token) {
      toast.warn('🔒 Login required');
      toast.info('📝 Please sign up to create a post');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = {
        title: data.title,
        body: data.body,
        tags: data.tags.split(' ').filter((tag) => tag !== ''),
        ...(data.photo[0] && {
          photo: await readFileAsDataURL(data.photo[0]),
        }),
      };

      const result = await addPost(formData);

      if (result) {
        toast.success('✅ Post created successfully!');
        reset();
        navigate('/');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Create New Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Photo Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload Photo
          </label>
          <div className="flex items-center gap-4">
            <input
              {...register('photo')}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="h-16 w-16 rounded-md object-cover"
              />
            )}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 5,
                message: 'Title must be at least 5 characters',
              },
            })}
            className={`block w-full px-4 py-2 border rounded-md
              ${errors.title ? 'border-red-500' : 'border-gray-300'}
              focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="How are you feeling today?"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('body', {
              required: 'Content is required',
              minLength: {
                value: 20,
                message: 'Content must be at least 20 characters',
              },
            })}
            rows={4}
            className={`block w-full px-4 py-2 border rounded-md
              ${errors.body ? 'border-red-500' : 'border-gray-300'}
              focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Share your thoughts..."
          />
          {errors.body && (
            <p className="text-red-500 text-sm">{errors.body.message}</p>
          )}
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Tags <span className="text-red-500">*</span>
          </label>
          <input
            {...register('tags', {
              required: 'At least one tag is required',
              validate: (value) => {
                const tags = value.split(' ').filter((tag) => tag !== '');
                return tags.length > 0 || 'At least one tag is required';
              },
            })}
            className={`block w-full px-4 py-2 border rounded-md
              ${errors.tags ? 'border-red-500' : 'border-gray-300'}
              focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="e.g., travel food photography"
          />
          {errors.tags && (
            <p className="text-red-500 text-sm">{errors.tags.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md
            hover:bg-blue-700 focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:ring-offset-2
            disabled:bg-gray-400 disabled:cursor-not-allowed
            transition-colors duration-200"
        >
          {isSubmitting ? 'Posting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
