<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class BlogPost extends BaseModel
{
    protected string $table = 'blog_posts';
    protected array $fillable = [
        'title', 'slug', 'category', 'excerpt', 'watermark_text', 'intro_highlight',
        'content', 'image', 'image_alt_text', 'author', 'author_role', 'author_avatar_url', 'tags',
        'is_published', 'published_at', 'read_time', 'content_type_label', 'sort_order',
    ];

    public function incrementLikes(int $id): int
    {
        $stmt = $this->pdo->prepare('UPDATE blog_posts SET likes_count = likes_count + 1 WHERE id = :id');
        $stmt->execute([':id' => $id]);

        $stmt = $this->pdo->prepare('SELECT likes_count FROM blog_posts WHERE id = :id');
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();

        return (int) ($row['likes_count'] ?? 0);
    }

    public function search(string $query): array
    {
        $like = '%' . str_replace(['%', '_'], ['\\%', '\\_'], $query) . '%';
        $sql = 'SELECT * FROM blog_posts WHERE is_published = 1 AND (
            title LIKE :q1 OR excerpt LIKE :q2 OR category LIKE :q3 OR
            author LIKE :q4 OR tags LIKE :q5
        ) ORDER BY sort_order ASC, published_at DESC LIMIT 30';

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':q1' => $like, ':q2' => $like, ':q3' => $like, ':q4' => $like, ':q5' => $like]);
        return $stmt->fetchAll() ?: [];
    }
}
