import bcrypt from "bcrypt";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);
const usersCollection = collection(db, "users");

export type UserRole = "member" | "admin" | "editor";
export type AuthProviderType = "credentials" | "google" | "github";

export type UserRecord = {
  id: string;
  email: string;
  fullname?: string;
  password?: string;
  role?: UserRole;
  image?: string | null;
  type?: AuthProviderType;
};

export type UserListItem = Omit<UserRecord, "password">;

type RegisterUserInput = {
  email: string;
  fullname: string;
  password: string;
  role?: UserRole;
  image?: string | null;
};

type OAuthUserInput = {
  email: string;
  fullname?: string;
  image?: string | null;
  type: Exclude<AuthProviderType, "credentials">;
  role?: UserRole;
};

type AuthActionResult = {
  status: boolean;
  message: string;
  data?: UserRecord;
};

type SignUpCallback = (result: { status: string; message: string }) => void;

const mapDocuments = <T>(snapshot: Awaited<ReturnType<typeof getDocs>>) =>
  snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Record<string, unknown>),
  })) as T[];

async function createUserRecord(
  userData: Omit<UserRecord, "id">
): Promise<UserRecord> {
  const documentRef = await addDoc(usersCollection, userData);

  return {
    id: documentRef.id,
    ...userData,
  };
}

async function updateUserRecord(
  userId: string,
  userData: Partial<Omit<UserRecord, "id" | "email" | "role">>
) {
  await updateDoc(doc(db, "users", userId), userData);
}

async function updateUserRoleRecord(userId: string, role: UserRole) {
  await updateDoc(doc(db, "users", userId), { role });
}

export async function retrieveCollection(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  return mapDocuments<Record<string, unknown> & { id: string }>(snapshot);
}

export async function retrieveProducts(collectionName: string) {
  return retrieveCollection(collectionName);
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.data() ?? null;
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  if (!email) {
    return null;
  }

  const userQuery = query(usersCollection, where("email", "==", email));
  const querySnapshot = await getDocs(userQuery);
  const users = mapDocuments<UserRecord>(querySnapshot);

  return users[0] ?? null;
}

export async function retrieveUsers(): Promise<UserListItem[]> {
  const snapshot = await getDocs(usersCollection);
  const users = mapDocuments<UserRecord>(snapshot);

  return users.map(({ password, ...user }) => user);
}

export async function signIn(email: string) {
  return findUserByEmail(email);
}

export async function verifyUserCredentials(
  email: string,
  password: string
): Promise<UserRecord | null> {
  const user = await findUserByEmail(email);

  if (!user?.password) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  return isPasswordValid ? user : null;
}

export async function signUp(
  userData: RegisterUserInput,
  callback: SignUpCallback
) {
  try {
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
      callback({
        status: "error",
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await createUserRecord({
      email: userData.email,
      fullname: userData.fullname,
      password: hashedPassword,
      role: userData.role ?? "member",
      image: userData.image ?? null,
      type: "credentials",
    });

    callback({
      status: "success",
      message: "User registered successfully",
    });
  } catch (error) {
    callback({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to register user",
    });
  }
}

export async function signInWithOAuth(
  userData: OAuthUserInput
): Promise<AuthActionResult> {
  try {
    if (!userData.email) {
      return {
        status: false,
        message: "OAuth account email is required",
      };
    }

    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
      await updateUserRecord(existingUser.id, {
        fullname: userData.fullname ?? existingUser.fullname ?? "",
        image: userData.image ?? existingUser.image ?? null,
        type: userData.type,
      });

      return {
        status: true,
        message: `User authenticated with ${userData.type}`,
        data: {
          ...existingUser,
          fullname: userData.fullname ?? existingUser.fullname,
          image: userData.image ?? existingUser.image ?? null,
          type: userData.type,
        },
      };
    }

    const createdUser = await createUserRecord({
      email: userData.email,
      fullname: userData.fullname ?? "",
      image: userData.image ?? null,
      role: userData.role ?? "member",
      type: userData.type,
    });

    return {
      status: true,
      message: `User authenticated with ${userData.type}`,
      data: createdUser,
    };
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error ? error.message : "Failed to authenticate OAuth user",
    };
  }
}

export async function signInWithGoogle(
  userData: Omit<OAuthUserInput, "type">
) {
  return signInWithOAuth({
    ...userData,
    type: "google",
  });
}

export async function updateUserRole(userId: string, role: UserRole) {
  await updateUserRoleRecord(userId, role);
}
