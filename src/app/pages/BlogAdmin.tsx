"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Save, Eye } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

export default function BlogAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [postData, setPostData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Design",
    metaTitle: "",
    metaDescription: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "demo") {
      setIsAuthenticated(true);
      toast.success("Successfully logged in!");
    } else {
      toast.error("Invalid credentials. Try username: admin, password: demo");
    }
  };

  const handleSave = () => {
    toast.success("Post saved successfully!");
  };

  const handlePublish = () => {
    toast.success("Post published successfully!");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md px-4"
        >
          <div className="p-8 bg-card border border-border rounded-3xl">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock size={32} />
            </div>

            <h1 className="text-3xl text-center mb-2">Blog Admin</h1>
            <p className="text-center text-foreground/70 mb-8">
              Sign in to manage blog posts
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label>Username</Label>
                <Input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  placeholder="admin"
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="demo"
                />
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <p className="text-center text-sm text-foreground/60 mt-6">
              Demo credentials: admin / demo
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl">Create New Post</h1>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSave}>
                <Save size={18} className="mr-2" />
                Save Draft
              </Button>
              <Button onClick={handlePublish}>
                <Eye size={18} className="mr-2" />
                Publish
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <Label>Post Title</Label>
                  <Input
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <Label>Excerpt</Label>
                  <Textarea
                    value={postData.excerpt}
                    onChange={(e) => setPostData({ ...postData, excerpt: e.target.value })}
                    placeholder="Brief description of the post"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Content</Label>
                  <Textarea
                    value={postData.content}
                    onChange={(e) => setPostData({ ...postData, content: e.target.value })}
                    placeholder="Write your post content here..."
                    rows={15}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <h3 className="text-lg">Post Settings</h3>

                  <div>
                    <Label>Category</Label>
                    <select
                      value={postData.category}
                      onChange={(e) => setPostData({ ...postData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-input-background rounded-lg border border-border"
                    >
                      <option>Design</option>
                      <option>Development</option>
                      <option>Branding</option>
                      <option>Marketing</option>
                      <option>Strategy</option>
                    </select>
                  </div>
                </div>

                <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <h3 className="text-lg">SEO Settings</h3>

                  <div>
                    <Label>Meta Title</Label>
                    <Input
                      value={postData.metaTitle}
                      onChange={(e) => setPostData({ ...postData, metaTitle: e.target.value })}
                      placeholder="SEO title"
                    />
                  </div>

                  <div>
                    <Label>Meta Description</Label>
                    <Textarea
                      value={postData.metaDescription}
                      onChange={(e) =>
                        setPostData({ ...postData, metaDescription: e.target.value })
                      }
                      placeholder="SEO description"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
