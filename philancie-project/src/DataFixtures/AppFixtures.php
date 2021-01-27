<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Sheet;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    /**
     * Encodeur de mot de passe
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder){
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for($u = 0; $u < 15; $u++){
            $user = new User();
            $hash = $this->encoder->encodePassword($user, "password");
            $user   ->setFirstname($faker->firstName())
                    ->setLastName($faker->lastName())
                    ->setEmail($faker->email())
                    ->setPassword($hash);

            $manager->persist($user);
        }

        for($c = 0; $c < 10; $c++){
            $customer = new Customer();
            $customer   ->setFirstname($faker->firstName())
                    ->setLastName($faker->lastName())
                    ->setEmail($faker->email());

            $manager->persist($customer);
        }

        for($s = 0; $s < 50; $s++){
            $sheet = new Sheet();
            $sheet  ->setSubject($faker->realText($maxNbChars = 20))
                    ->setContent($faker->realText($maxNbChars = 250));

            $manager->persist($sheet);
        }

        $manager->flush();
    }
}
