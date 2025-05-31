import { useState, useEffect } from 'react';

interface UserData {
  isNew: boolean;
  hobbies: string[];
}

export const useUserData = () => {
  const [user, setUser] = useState<UserData>({
    isNew: true,         // set false to test summary view
    hobbies: [],         // empty array means user has not selected hobbies
  });

  useEffect(() => {
    // Simulate data fetch (replace with real API / storage fetch)
    const fetchUser = async () => {
      const dummyUser: UserData = {
        isNew: false,
        hobbies: ['Music', 'Reading', 'Gaming'], // set to [] for new user view
      };
      setUser(dummyUser);
    };

    fetchUser();
  }, []);

  return { user, setUser };
};
