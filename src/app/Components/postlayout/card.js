export function PostCard({post}) {
    return (
        <div className="border border-cyan-500 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-md">
            <h1 className="text-xl font-bold text-cyan-700 mb-2">{post.title}</h1>
            <div>
                {post.image_path}
            </div>
            <div className="bg-cyan-50 p-3 rounded">
                <p className="text-gray-700">{post.description}</p>
            </div>
        </div>
    )
}