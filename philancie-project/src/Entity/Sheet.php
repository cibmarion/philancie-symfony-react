<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\SheetRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=SheetRepository::class)
 * @ApiResource(
 * )
 * @ApiFilter(OrderFilter::class)
 * @ApiFilter(SearchFilter::class)
 */
class Sheet
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * Groups({"sheets_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message= "Un titre est obligatoire")
     * @Assert\Length(min=3, minMessage="Le titre doit faire entre 3 et 255 caractères", max=255, maxMessage="Le titre doit faire entre 3 et 255 caractères")
     */
    private $subject;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message= "Une description est obligatoire")
     * @Assert\Length(min=3, minMessage="La description doit faire entre 3 et 255 caractères", max=255, maxMessage="La description doit faire entre 3 et 255 caractères")
     */
    private $content;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(string $subject): self
    {
        $this->subject = $subject;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }
}
