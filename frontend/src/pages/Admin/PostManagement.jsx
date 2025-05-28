import { useState, useEffect } from 'react';
import { Toaster } from '../../components/ui/Sonner';
import { toast } from 'sonner';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import ConfirmDialog from '../../components/ConfirmDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/Dialog';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/Table';

const PostInfo = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', image: '', cta: '' });
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    title: '',
    message: '',
    onConfirm: null,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/post/');
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        toast.error('Tải bài đăng thất bại.');
        console.error('Lỗi khi tải bài đăng:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.image || !newPost.cta) {
      toast.error('Vui lòng điền vào tất cả các ô.');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Thêm bài đăng mới',
      message: 'Bạn có chắc chắn muốn thêm bài đăng này không?',
      onConfirm: async () => {
        try {
          const response = await fetch('http://localhost:5000/api/admin/post/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
          });

          if (!response.ok) {
            throw new Error('Thêm bài đăng mới thất bại.')
          }

          const addedPost = await response.json();
          setPosts([...posts, addedPost]);
          setNewPost({ title: '', image: '', cta: '' });
          toast.success('Thêm bài đăng mới thành công!');
        } catch (error) {
          toast.error('Thêm bài đăng mới thất bại.');
          console.error('Lỗi khi thêm bài đăng mới:', error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      onCancel: () => setConfirmDialog({ ...confirmDialog, isOpen: false }),
    });
  };

  const handleDeletePost = async (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Xóa bài đăng',
      message: 'Bạn có chắc chắn muốn xóa bài đăng này không?',
      onConfirm: async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/admin/post/${id}`,
            {
              method: 'DELETE',
            }
          );

          if (!response.ok) {
            throw new Error('Xóa bài đăng thất bại.');
          }

          setPosts(posts.filter((post) => post.id !== id));
          toast.success('Xóa bài đăng thành công');
        } catch (error) {
          toast.error('Xóa bài đăng thất bại.');
          console.error('Lỗi khi xóa bài đăng:', error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      onCancel: () => setConfirmDialog({ ...confirmDialog, isOpen: false }),
    });
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setIsEditOpen(true);
  };

  const handleSaveEdit = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Lưu lại các thay đổi',
      message: 'Bạn có chắc chắn muốn lưu lại các thay đổi cho bài đăng này không?',
      onConfirm: async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/admin/post/${selectedPost.id}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(selectedPost),
            }
          );

          if (!response.ok) {
            throw new Error('Cập nhật bài đăng thất bại.');
          }

          const updatedPost = await response.json();
          setPosts(
            posts.map((post) =>
              post.id === updatedPost.id ? updatedPost : post
            )
          );
          setIsEditOpen(false);
          toast.success('Bài đăng đã được cập nhật thành công!');
        } catch (error) {
          toast.error('Cập nhật bài đăng thất bại.');
          console.error('Lỗi khi lưu lại các thay đổi:', error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      onCancel: () => setConfirmDialog({ ...confirmDialog, isOpen: false }),
    });
  };

  const renderImagePreview = (imageURL) => {
    if (!imageURL) return null;
    return imageURL;
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />

      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-center text-2xl font-bold">Quản lý bài đăng</h1>
        </CardHeader>
        <CardContent>
          {/* Form thêm bài viết */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                placeholder="Tiêu đề bài đăng"
              />
              <Input
                value={newPost.image}
                onChange={(e) =>
                  setNewPost({ ...newPost, image: e.target.value })
                }
                placeholder="Đường dẫn ảnh"
              />
              <Input
                value={newPost.cta}
                onChange={(e) =>
                  setNewPost({ ...newPost, cta: e.target.value })
                }
                placeholder="CTA"
              />
            </div>
            <div className="text-right">
              <Button
                onClick={handleAddPost}
                className={`text-white ${
                  !newPost.title || !newPost.image || !newPost.cta
                    ? 'cursor-not-allowed bg-gray-300 opacity-50'
                    : 'bg-[#ff4d4d] hover:bg-[#c84c4c]'
                }`}
                disabled={!newPost.title || !newPost.image || !newPost.cta}
              >
                Thêm bài đăng
              </Button>
            </div>
          </div>

          {/* Table hiển thị danh sách bài viết */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-1/4 text-center">Tiêu đề</TableHead>
                  <TableHead className="w-1/4 text-center">Ảnh</TableHead>
                  <TableHead className="w-1/4 text-center">CTA</TableHead>
                  <TableHead className="w-1/4 text-center">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow
                    key={post.id}
                    className="transition duration-300 hover:bg-gray-50"
                  >
                    <TableCell className="text-center">{post.title}</TableCell>
                    <TableCell className="text-center">
                      <img
                        src={renderImagePreview(post.image)}
                        alt={post.title}
                        className="mx-auto h-16 w-16 rounded-md object-cover shadow-md"
                      />
                    </TableCell>
                    <TableCell className="text-center">{post.cta}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          onClick={() => handleEditPost(post)}
                          className="rounded-md bg-green-400 p-2 hover:bg-green-500"
                          size="icon"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeletePost(post.id)}
                          className="rounded-md bg-red-400 p-2 hover:bg-red-500"
                          size="icon"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal chỉnh sửa bài viết */}
      {selectedPost && (
        <Dialog open={isEditOpen} onOpenChange={() => setIsEditOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chỉnh sửa thông tin bài đăng</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4">
              <Input
                value={selectedPost.title}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, title: e.target.value })
                }
                placeholder="Tiêu đề bài đăng"
              />
              <Input
                value={selectedPost.image}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, image: e.target.value })
                }
                placeholder="Đường dẫn ảnh"
              />
              <Input
                value={selectedPost.cta}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, cta: e.target.value })
                }
                placeholder="Hành động"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSaveEdit} className="text-white">
                Lưu lại các thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={confirmDialog.onCancel}
      />
    </div>
  );
};

export default PostInfo;
